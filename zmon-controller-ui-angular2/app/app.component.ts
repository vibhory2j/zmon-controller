import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from './services/alert.service';

@Component({
  selector: 'zmon-app',
  templateUrl: 'templates/alerts.overview.html',
})
export class AppComponent implements OnInit {
  alerts: Alert[];

  constructor(private alertService: AlertService) {
    console.log('Creating AppComponent...');
    this.alertService = alertService;
  }

  updateAlerts(alerts: Alert[]): void {
    this.alerts = alerts;
  }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(alerts => this.updateAlerts(alerts));
  }
}
