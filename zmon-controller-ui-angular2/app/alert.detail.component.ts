import { Component, OnInit, OnChanges, Input, ElementRef, AfterViewChecked } from '@angular/core';
import { Alert, DataResult, DataPoint, AlertDefinition, Entity, AlertService } from './services/alert.service';
import { Observable, Subscription } from 'rxjs/Rx';

declare var $: any;

@Component({
  selector: 'alert-details',
  templateUrl: 'templates/alert.details.html'
})
export class AlertDetailComponent implements OnInit, OnChanges, AfterViewChecked {

    @Input()
    alert: Alert;

    valueKeys: Set<string>;
    values: Map<string, Map<string, any>>;

    entity: string;
    entityData: Map<string, number[][]>;

    data: DataResult[];

    currentSubscription: Subscription = null;

    constructor(private alertService: AlertService, private element: ElementRef) {
    }

    prepareValues(): void {
      let l: Map<string, Map<string, any>> = new Map();
      let keys: Set<string> = new Set();
      if (this.alert.entities.length > 0) {
        for (let e of this.alert.entities) {
          if (typeof e.result.value === 'object') {
            let m: Map<string, any> = new Map();
            let j = e.result.value;
            for (let k of Object.keys(j)) {
              m.set(k, JSON.stringify(j[k]));
              keys.add(k);
            }
            l.set(e.entity, m);
          } else {
            let m: Map<string, any> = new Map();
            m.set('value', e.result.value);
            keys.add('value');
            l.set(e.entity, m);
          }
        }
      }
      this.values = l;
      this.valueKeys = keys;
    }

    ngOnInit(): void {
      if (this.alert) {
        console.log('alert details (init):' + this.alert.alert_definition.id);
      } else {
        console.log('alert details (init): not-set');
      }
    }

    updateData(data: DataResult[]): void {
      this.data = data;
      this.updateEntityData();
    }

    updateEntityData(): void {
      if (!this.data || !this.entity) {
        return;
      }

      let e = this.data.filter(x => x.entity === this.entity)
      if (!(e.length > 0)) {
        return;
      }

      let values = e[0].results;
      let m: Map<string, number[][]> = new Map();

      for (let v of values) {
        let keys = Object.keys(v.value);
        for (let k of keys) {
          if (typeof v.value[k] === 'number') {
            if (m.has(k)) {
              m.get(k).push([v.ts, v.value[k]]);
            } else {
              m.set(k, [[v.ts, v.value[k]]]);
            }
          }
        }
      }
      this.entityData = m;
    }

    selectEntity(entity: string): void {
      this.entity = entity;
      this.updateEntityData();
    }

    ngOnChanges(): void {
      if (this.alert) {
        this.entity = null;
        this.data = null;
        this.entityData = null;

        console.log('alert details (change):' + this.alert.alert_definition.id);
        this.prepareValues();

        if (this.currentSubscription != null) {
          this.currentSubscription.unsubscribe();
        }

        let o: Observable<DataResult[]> = this.alertService.getAlertAndCheckData(this.alert.alert_definition.id, 25);
        this.currentSubscription = o.subscribe(data => this.updateData(data));
      } else {
        console.log('alert details (change): not-set');
      }
    }

    ngAfterViewChecked(): void {
      if (this.entity && this.entityData) {
        this.valueKeys.forEach(k => {
          $.plot($("#flot-1"), [this.entityData.get(k)], {});
        });
      }
    }
}
