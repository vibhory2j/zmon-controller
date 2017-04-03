import { Component, OnInit } from '@angular/core';
import { Alert, AlertDefinition, Entity, AlertService } from './services/alert.service';
import { AlertsList } from './alerts/alerts-list/alerts-list.component'

@Component({
  selector: 'zmon-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

export class AppComponent implements OnInit {
  alerts: Alert[];
  tags: Map<string, number>;
  tagKeys: string[];
  activeTag: string;
  selectedAlert: Alert;

  constructor(private alertService: AlertService) {
    console.log('Creating AppComponent...');
    this.activeTag = null;
    this.tags = new Map();
  }

  isEnabled(t: string): boolean {
    return t === this.activeTag;
  }

  toggleTag(tag: string): void {
    if (this.activeTag === tag) {
      this.activeTag = null;
    } else {
      this.activeTag = tag;
    }
    this.filterAlerts();
  }

  filterAlerts(): void {
    this.alerts = this.alerts;
  }

  onSelect(alert: Alert): void {
    this.selectedAlert = alert;
  }

  updateAlerts(alerts: Alert[]): void {
    this.alerts = alerts;
  }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(alerts => this.updateAlerts(alerts));
  }
}
