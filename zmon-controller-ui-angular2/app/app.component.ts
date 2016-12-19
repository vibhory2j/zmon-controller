import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from './services/alert.service';

@Component({
  selector: 'zmon-app',
  templateUrl: 'templates/alerts.overview.html',
})
export class AppComponent implements OnInit {
  alerts: Alert[];

  constructor(private alertService: AlertService) {
    this.alertService = alertService;
  }

  getAlerts(): void {
    this.alertService.getAlerts().subscribe(alerts => this.alerts = alerts);
  }

  ngOnInit(): void {
    this.getAlerts();
  }
}
