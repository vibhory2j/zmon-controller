<dashboard>
    <div class="dashboard-body">
        <div class="alert-navi">
            <div id="alert-list">
                <div each={ alerts }><div>{ name }</div></div>
            </div>
        </div>

        <div class="alert-body">
            <alert-details entities={ opts.entities } 
                           alert={ opts.alert_def } 
                           check={ opts.check_def }
                           entitygroups={ this.entity_groups }></alert-details>
        </div>
    </div>


    <script type="es6">
    this.alerts = []

    this.calcAlertList = () => {
        console.log("opts", this.opts)
        
        this.alerts = this.opts.alerts.alerts.map(x => {
                return { name: x.alert_definition.name }
            })

        console.log("this.alerts", this.alerts);
        return true;
    }

    this.on('update', function() {
        console.log("update triggered");
        this.calcAlertList();
        
    })

    let groupByApplicationId = (groups, e) => {
        if (!(e.application_id in groups)) {
            groups[e.application_id] = {entities: [e]};
        }
        else {
            groups[e.application_id]["entities"].push(e)
        }
        return groups
    }

    this.entity_groups = Object.values(opts.entities_details.reduce( groupByApplicationId, {}));

    </script>
</dashboard>

<alert-details>
    <div class="flex col struct-details">
            <div class="flex element a-title">
                <div class="content">
                    <h1>Alert: {opts.alert.name}</h1>
                </div>
            </div>
            <div class="flex">
                <div class="flex element a-team">
                    <div class="content"><h2>Team: { opts.alert.team }</h2></div>
                </div>
                <div class="flex element a-id">
                    <div class="content"><h2>ID: { opts.alert.id }</h2></div>
                </div>
            </div>
            <div class="flex element">
                <div class="content"><h2>Condition</h2>
                <pre>{ opts.alert.condition}</pre>
                </div>
            </div>
            <div class="flex a-entity-groups">
                <entity-block each={ this.opts.entitygroups } group={ entities }>
                </entity-block>
            </div>
    </div>
    <div class="flex col struct-details">
        <div class="flex element"><div class="content"><h2>Check: {opts.check.name}</h2></div></div>
        <div class="flex">
            <div class="flex element a-team">
                <div class="content"><h2>Team: { opts.check.owning_team }</h2></div>
            </div>
            <div class="flex element a-id">
                <div class="content"><h2>ID: { opts.check.id }</h2></div>
            </div>
        </div>
        <div class="flex element">
            <div class="content">
                <pre>{ opts.check.command }</pre>
            </div>
        </div>
    </div>
    <script type="es6">
    </script>
</alert-details>

<entity-block>
    <div class="flex a-entity-groups">
        <div class="flex element a-entity-group">
            <div class="content"><h3>Application ID: { opts.group[0].application_id }</h3>
                <div each={ opts.group }>
                    { id }
                </div>
            </div>
        </div>
    </div>
    <script type="es6">
    </script>
</entity-block>