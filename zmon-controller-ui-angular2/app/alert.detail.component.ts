import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertDefinition, Entity, AlertService } from './services/alert.service';

@Component({
  selector: 'alert-details',
  templateUrl: 'templates/alert.details.html'
})
export class AlertDetailComponent implements OnInit {

    @Input()
    alert: Alert;

    constructor(private alertService: AlertService) {

    }

    ngOnInit(): void {

    }
}
