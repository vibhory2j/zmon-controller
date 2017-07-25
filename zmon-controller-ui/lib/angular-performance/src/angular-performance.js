var perf = angular.module('performance', []);



/**
 * Listens for performanceLoaded events and sends a message to the beacon
 *
 * @see performanceLoaded
 */
perf.directive('performance', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          console.log('linked')

            var startTime = (new Date).getTime();
            var divs = [];

            scope.$on('PERF_DONE', function (event, args) {
                console.log('perf done')
                var index = divs.indexOf(args);
                if (index >= 0) divs.splice(index, 1);

                //Call beacon when all emits have been received
                if (index >= 0 && divs.length == 0) {
                    var finishTime = (new Date).getTime() - startTime;
                    var initialLoad = 0;
                    if (window.performance) {
                        initialLoad = window.performance.timing.domComplete - window.performance.timing.fetchStart;
                    }

                    initialLoad = (!initialLoad || initialLoad<0) ? 0:initialLoad;
                    finishTime = (!finishTime || finishTime<0) ? 0:finishTime;

                    var i = new Image();
                    i.src = attrs.performanceBeacon + '?content=' + finishTime + '&initial=' + initialLoad + '&name=' + attrs.performance;
                }
            });

            scope.$on('PERF_REGISTER', function (event, args) {
                console.log('register')
                divs.push(args);
            });
        }
    };
}]);

/**
 * Registers itself and watches a scope variable for changes to indicate that it is done
 *
 */
perf.directive('performanceLoaded', ['$timeout', function ($timeout) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            console.log('performanceLoaded linked')


            $timeout(function () {
                scope.$emit('PERF_REGISTER', scope.$id);
            }, 0);


            $timeout(function() {
                var unwatchLoaded = scope.$watch(attrs.performanceLoaded, function (newValue, oldValue) {
                    console.log('watch', newValue, oldValue)
                    if (newValue) {
                        scope.$emit('PERF_DONE', scope.$id);
                        //Unregisters the $watch
                        unwatchLoaded();
                    }
                });
            }, 0)
        }
    }
}]);
