import { Component, OnInit } from '@angular/core';

import { AlertDefinition } from './alert-definition'
import { AlertService } from './alert.service'

@Component({
  selector: 'zmon-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectedAlert: AlertDefinition;
  alerts: AlertDefinition[];

  title = 'ZMON';

  constructor(private alertService: AlertService) {  }

  updateAlerts(alerts: AlertDefinition[]): void {
    this.alerts = alerts;
  }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(alerts => this.updateAlerts(alerts));
  }
}
