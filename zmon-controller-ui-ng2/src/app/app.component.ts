import { Component, OnInit } from '@angular/core';
import { Alert, AlertDefinition, Entity, AlertService } from './services/alert.service';

@Component({
  selector: 'zmon-app',
  templateUrl: 'alerts.overview.html'
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
    if (this.activeTag != null) {
      this.alerts = this.alerts.filter(x => x.alert_definition.tags && x.alert_definition.tags.indexOf(this.activeTag) >= 0);
    } else {
      this.alerts = this.alerts;
    }
  }

  onSelect(alert: Alert): void {
    this.selectedAlert = alert;
  }

  updateAlerts(alerts: Alert[]): void {
    let tags: Map<string, number> = new Map();
    for (let a of alerts) {
      if (a.alert_definition.tags && a.alert_definition.tags.length > 0) {
        for (let t of a.alert_definition.tags) {
          if (t in tags) {
            tags[t] = tags[t] + 1;
          } else {
            tags[t] = 1;
          }
        }
      }
    }
    this.tags = tags;
    this.tagKeys = Object.keys(this.tags);
    if (this.activeTag != null) {
      this.alerts = alerts.filter(x => x.alert_definition.tags && x.alert_definition.tags.indexOf(this.activeTag) >= 0);
    } else {
      this.alerts = alerts;
    }
  }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(alerts => this.updateAlerts(alerts));
  }
}
