module.exports = {
    allAlerts: function() {
                    const NUMBER_OF_ALERTS = 2000;

                    var response = [];
                    var ids = [];
                    var teams = [ "ZMON", "STUPS", "ACID", "EagleEye", "Platform", "24x7" ].sort();
                    var status = [ "ACTIVE", "INACTIVE", "DELETED" ];
                    var priorities = [1, 2, 3];
                    var conditions = [ "value > 85", "False", ">0", "capture(cpu_percentage=value['cpu_percentage']) > 60", "True", "<99" ];

                    function Alert(id) {
                        var now = new Date();
                        now.setDate(now.getDate() - id % 30);

                        this.id = id;
                        this.name = 'Alert ' + id;
                        this.description = "this is the description of the alert with id " + id + " just for test purposes";
                        this.team = teams[id % teams.length];
                        this.responsible_team = teams[id % teams.length];
                        this.condition = conditions[id % conditions.length];
                        this.entities = [];
                        this.entities_exclude = [];
                        this.status = status[id % status.length];
                        this.priority = priorities[id % priorities.length];
                        this.last_modified = now.getTime();
                        this.parameters = null;
                        this.tags = null;
                        this.entities = [];
                    }

                    while (ids.length < NUMBER_OF_ALERTS) {
                        var id = Math.floor(Math.random() * NUMBER_OF_ALERTS* 100);
                        if (ids.indexOf(id) !== -1) {
                            break;
                        }
                        ids.push(id);
                        response.push(new Alert(id));
                    }

                    return JSON.stringify(response);
    }
}
