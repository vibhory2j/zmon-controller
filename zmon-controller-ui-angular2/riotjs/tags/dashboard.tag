<dashboard>    
    <div class="container">
        <div class="flex">
            <div class="flex col">
                <div class="flex element">
                    <div id="alert-list">
                        <div each={ alerts }>{ name }</div>
                    </div>
                </div>
            </div>
            <alert-details alert={ opts.alert_def } check={ opts.check_def }></alert-details>
        </div>
    </div>


    <script type="es6">
    this.alerts = opts.alerts.map(x => {
        return {name: x.alert_definition.name}
    })
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
</alert-details>