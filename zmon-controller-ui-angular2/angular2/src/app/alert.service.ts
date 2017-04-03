import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AlertDefinition } from './alert-definition'
import { ChartData } from './chart-data'

@Injectable()
export class AlertService {

  constructor(private http: Http) {
    console.log('Creating service...');
  }

  getAlerts(): Observable<AlertDefinition[]> {
    // rest/allAlerts?team=*
    return Observable.interval(5000).switchMap(() => this.http
        .get('http://localhost:3003/rest/allAlerts')
        .map((r: Response) => { return r.json() as AlertDefinition[]; } ));
  }

  getAlertAndCheckData(alertId: number, limit: number): Observable<ChartData[]> {
    return Observable.interval(15000).switchMap(() => this.http
        .get(`/rest/checkAlertResults?alert_id=${alertId}&limit=${limit}`)
        .map((r: Response) => { return r.json() as ChartData[]; } ));
  }
}
