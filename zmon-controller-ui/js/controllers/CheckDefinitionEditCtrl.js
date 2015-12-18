angular.module('zmon2App').controller('CheckDefinitionEditCtrl', ['$scope', '$routeParams', '$location', 'MainAlertService', 'CommunicationService', 'FeedbackMessageService', 'UserInfoService', 'APP_CONST',
    function($scope, $routeParams, $location, MainAlertService, CommunicationService, FeedbackMessageService, UserInfoService, APP_CONST) {

        // Set in parent scope which page is active for the menu styling
        $scope.$parent.activePage = 'check-definitions'; // is not a menu option, but still set

        // for route '/check-definitions/edit/:checkDefinitionId' [edit check]
        if ($routeParams.checkDefinitionId) {
            $scope.checkDefinitionId = parseInt($routeParams.checkDefinitionId);
        }
        
        $scope.userInfo = UserInfoService.get();
        
        $scope.invalidFormat = false;
        $scope.showDetails = false;
        $scope.showDescriptionPreview = false;
        $scope.showPotentialImpactPreview = false;
        $scope.showPotentialAnalysisPreview = false;
        $scope.showPotentialSolutionPreview = false;
        $scope.showTechnicalDetailsPreview = false;
        $scope.allTags = [];
        $scope.defaultEntitiesFilter = undefined;
        $scope.defaultEntitiesExcludeFilter = undefined;
        $scope.defaultNotifications = undefined;

        // Entity filter types initialized by default with GLOBAL (which is not provided by backend as separate type) and the rest comes from backend
        $scope.entityFilter.types = [{
            "type": "GLOBAL"
        }];
        $scope.entityExcludeFilter.types = [{
            "type": "GLOBAL"
        }];

        // User can define the entity filters either as plain JSON text or through a form which corresponds to an array of objects
        $scope.entityFilter.formEntityFilters = [];
        $scope.entityFilter.textEntityFilters = '[]';
        $scope.entityExcludeFilter.formEntityFilters = [];
        $scope.entityExcludeFilter.textEntityFilters = '[]';

        // Flag to toggle UI on whether user types JSON text or uses form to define the entity filters
        $scope.entityFilterInputMethod = 'text';
        $scope.entityExcludeFilterInputMethod = 'text';

        $scope.INDENT = '    ';

        $scope.checkDefinition = null;

        $scope.focusedElement = null;

        $scope.save = function() {
            if ($scope.cdForm.$valid) {
                try {
                    $scope.checkDefinition.notifications = JSON.parse($scope.notificationsJson);

                    var check = $scope.checkDefinition;
                    
                        CommunicationService.updateCheckDefinition(check).then(function (data) {
                            FeedbackMessageService.showSuccessMessage('Saved successfully; redirecting...', 500, function () {
                                $location.path('/check-definition/view/' + data.id);
                            });
                        });
                } catch (ex) {
                    $scope.invalidFormat = true;
                    return FeedbackMessageService.showErrorMessage('JSON format is incorrect' + ex);
                }
            } else {
                $scope.cdForm.submitted = true;
                $scope.focusedElement = null;
            }
        };

        $scope.cancel = function() {
            $scope.cdForm.submitted = false;
            if ($scope.mode === 'edit') {
                $location.path('/check-definition/view/' + $scope.checkDefinitionId);
            } else {
                $location.path('/check-definitions');
            }
        };

        // Get a check definition from the backend
        $scope.getCheckDefinition = function() {
            CommunicationService.getCheckDefinition($scope.checkDefinitionId).then(
                function(response) {
                    $scope.checkDefinition = response;
                }
            );
        };
        
        // Reset entity filter to inherit values again
        $scope.resetEntityFilter = function() {
            var entities = $scope.alertDefinition.entities || $scope.parentAlertDefinition.entities || $scope.defaultEntitiesFilter;
            var str = JSON.stringify(entities, null, $scope.INDENT);
            $scope.entityFilter.textEntityFilters = str;
            $scope.entityFilter.formEntityFilters = entities;
        };

        // Reset entity EXCLUDE filter to inherit values again
        $scope.resetEntityExcludeFilter = function() {
            var entitiesExclude = $scope.alertDefinition.entities_exclude || $scope.parentAlertDefinition.entities_exclude || $scope.defaultEntitiesExcludeFilter;
            var str = JSON.stringify(entitiesExclude, null, $scope.INDENT);
            $scope.entityExcludeFilter.textEntityFilters = str;
            $scope.entityExcludeFilter.formEntityFilters = entitiesExclude;
        };

        // Reset Notifications array from Alert Definition
        $scope.resetNotifications = function() {
            var notifications = $scope.checkDefinitionNode.notifications || $scope.defaultNotifications;
            $scope.notificationsJson = JSON.stringify(notifications, null, $scope.INDENT);
        };

        // Add a tag to the tags array
        $scope.addTag = function(tag) {
            if (typeof $scope.alertDefinition.tags === 'undefined' || $scope.alertDefinition.tags == null) {
                $scope.alertDefinition.tags = [];
            }
            if ($scope.alertDefinition.tags.indexOf(tag.text) === -1) {
                $scope.alertDefinition.tags.push(tag.text);
                $scope.markAsOverwritten('tags');
            };
        };
        
        // Validate a parameter's name to be a valid python variable name
        $scope.paramNameIsValid = function(name) {
            var re = /^[_a-zA-Z][_a-zA-Z0-9]*/;
            return re.test(name);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd.MM.yyyy';

        // If entity filter input method is 'form', reflect changes of entityFilter.formEntityFilters on entityFilter.textEntityFilters
        $scope.$watch('entityFilter.formEntityFilters', function() {
            if ($scope.entityFilterInputMethod === 'form') {
                // Process a copy so we safely remove $$hashKey property which we don't want to be transfered to entityFilter.textEntityFilters
                var formEntityFiltersClone = angular.copy($scope.entityFilter.formEntityFilters);
                for (var p in formEntityFiltersClone) {
                    if (formEntityFiltersClone.hasOwnProperty(p) && p === '$$hashKey') {
                        delete formEntityFiltersClone[p];
                    }
                }
                $scope.entityFilter.textEntityFilters = JSON.stringify(formEntityFiltersClone, null, $scope.INDENT);
            }
        }, true);

        // Same as above, but for excluded entities.
        $scope.$watch('entityExcludeFilter.formEntityFilters', function() {
            if ($scope.entityExcludeFilterInputMethod === 'form') {
                var formEntityFiltersClone = angular.copy($scope.entityExcludeFilter.formEntityFilters);
                for (var p in formEntityFiltersClone) {
                    if (formEntityFiltersClone.hasOwnProperty(p) && p === '$$hashKey') {
                        delete formEntityFiltersClone[p];
                    }
                }
                $scope.entityExcludeFilter.textEntityFilters = JSON.stringify(formEntityFiltersClone, null, $scope.INDENT);
            }
        }, true);

        // If entity filter input method is 'text', reflect changes of entityFilter.textEntityFilters on entityFilter.formEntityFilters
        $scope.$watch('entityFilter.textEntityFilters', function() {
            if ($scope.entityFilterInputMethod === 'text') {
                try {
                    var parsedJson = JSON.parse($scope.entityFilter.textEntityFilters);
                    $scope.entityFilter.formEntityFilters = parsedJson;
                    $scope.invalidFormat = false;
                } catch (ex) {
                    $scope.invalidFormat = true;
                }
            }
        }, true);

        // Same as above, for excluded entities.
        $scope.$watch('entityExcludeFilter.textEntityFilters', function() {
            if ($scope.entityExcludeFilterInputMethod === 'text') {
                try {
                    var parsedJson = JSON.parse($scope.entityExcludeFilter.textEntityFilters);
                    $scope.entityExcludeFilter.formEntityFilters = parsedJson;
                    $scope.invalidFormat = false;
                } catch (ex) {
                    $scope.invalidFormat = true;
                }
            }
        }, true);


        /** The getEntityProperties() returns an object with the data to populate the directives that represent the entity filter forms
         * We transform it to be an array of objects, one object per entity filter type with keys: "type" + keys that correspond to each filter type
         * E.g. [ {"type": "zomcat", "environment": "..", "project": "..", ...}, {"type": "host", "external_ip": "..", ...}, ... ]
         */
        CommunicationService.getEntityProperties().then(
            function(data) {
                for (var p in data) {
                    if (data.hasOwnProperty(p)) {
                        var nextFilterType = {};
                        nextFilterType.type = p;
                        angular.extend(nextFilterType, data[p]);
                        $scope.entityFilter.types.push(nextFilterType);
                        $scope.entityExcludeFilter.types.push(nextFilterType);
                    }
                }

                // Sort entity filter types.
                $scope.entityFilter.types = _.sortBy($scope.entityFilter.types, "type");
                $scope.entityExcludeFilter.types = _.sortBy($scope.entityExcludeFilter.types, "type");
            }
        );

        // Get all available tags
        CommunicationService.getAllTags().then(
            function(data) {
                $scope.allTags = data;
            }
        );

        MainAlertService.removeDataRefresh();

        // Determine controller actions based on mode.

        // Add mode
        if (!$scope.checkDefinitionId) {
            $scope.mode = 'add';
            $scope.defaultTeam = $scope.userInfo.teams.split(',')[0];
            $scope.defaultRespTeam = $scope.defaultTeam;
            $scope.defaultEntitiesFilter = [];
            $scope.defaultEntitiesExcludeFilter = [];
            $scope.defaultNotifications = [];
            return $scope.getCheckDefinition();
        }

        // Edit mode
        if ($scope.checkDefinitionId) {
            $scope.mode = 'edit';
            return $scope.getCheckDefinition($scope.checkDefinitionId);
        }
        
    }
]);
