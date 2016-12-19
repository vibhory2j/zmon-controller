import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export class AlertDefinition {
    id: number;
    name: string;
}

export class Alert {
    alert_definition: AlertDefinition;
}

@Injectable()
export class AlertService {

    constructor(private http: Http) {

    }

    getAlerts(): Observable<Alert[]> {
        // rest/allAlerts?team=*
        return Observable.interval(10000).switchMap(() => this.http
               .get('rest/allAlerts?team=*')
        .map((r: Response) => r.json().data as Alert[]));
    }
}
