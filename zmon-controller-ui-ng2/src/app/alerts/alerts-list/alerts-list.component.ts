import { Component, Input } from '@angular/core';
import { AlertDefinition } from '../alert-definition';

@Component({
  selector: 'alerts-list',
  templateUrl: 'alerts-list.component.html',
  styleUrls: [ 'alerts-list.component.css' ]
})

export class AlertsList {
  test: string

  @Input()
  alerts: AlertDefinition[]

  constructor() {
    this.alerts = [ new AlertDefinition(1, 'first alert')];
  }

  onSelect(alert) {
    console.log('select', alert.name)
  }
}
