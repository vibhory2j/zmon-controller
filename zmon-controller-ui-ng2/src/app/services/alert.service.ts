import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class AlertDefinition {
    constructor(
      public id: number,
      public name: string
    ) { }
}

export class AlertValue {
    start_time: number;
    captures: Map<string, string>;
    value: string;
    worker: string;
}

export class Entity {
    entity: string;
    result: AlertValue;
}

export class Alert {
    alert_definition: AlertDefinition;
    entities: Entity[];
}

export class DataPoint {
    ts: number;
    td: number;
    value: Object;
}

export class DataResult {
    entity: string;
    results: Array<DataPoint>;
}

@Injectable()
export class AlertService {

    constructor(private http: Http) {
        console.log('Creating service...');
    }

    getAlerts(): Observable<Alert[]> {
        // rest/allAlerts?team=*
        return Observable.interval(3000).switchMap(() => this.http
               .get('http://localhost:3003/rest/allAlerts')
        .map((r: Response) => { return r.json() as Alert[]; } ));
    }

    getAlertAndCheckData(alertId: number, limit: number): Observable<DataResult[]> {
        return Observable.interval(15000).switchMap(() => this.http
               .get(`/rest/checkAlertResults?alert_id=${alertId}&limit=${limit}`)
        .map((r: Response) => { return r.json() as DataResult[]; } ));
    }
}
