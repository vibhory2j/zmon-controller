module.exports = {
    entities: function() {
        var response = [],
            apps = [ "ZMON Controller", "Kubernetes", "Platform", "KairosDB", "Cassandra", "Very Long Application ID" ].sort();

        function Entity(id) {
            this.created_by = 'agent-' + id;
            this.data_center_code = 'GTH';
            this.environment = 'live';
            this.external_ip = '127.0.0.1';
            this.host = 'host-' + id;
            this.id = id;
            this.infrastructure_account = 'aws'+id;
            this.instance = id;
            this.last_modified = new Date();
            this.load_balancer_status = 'OK';
            this.path = '/';
            this.project = 'project';
            this.project_organization = 'Technology';
            this.project_type = 'js';
            this.team = 'team';
            this.type = 'js';
            this.url = id + ':3000';
            this.application_id = apps[id % apps.length];
        }

        for (var i=0; i<50; i++) {
            response.push(new Entity(i + Math.floor(Math.random() * (50))));
        }

        return JSON.stringify(response);
    }
}
