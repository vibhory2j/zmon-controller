var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { AlertDefinition } from '../alert-definition';
var AlertsList = (function () {
    function AlertsList() {
        this.alerts = [new AlertDefinition(1, 'first alert')];
    }
    AlertsList.prototype.onSelect = function (alert) {
        console.log('select', alert.name);
    };
    return AlertsList;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], AlertsList.prototype, "alerts", void 0);
AlertsList = __decorate([
    Component({
        selector: 'alerts-list',
        templateUrl: 'alerts-list.component.html',
        styleUrls: ['alerts-list.component.css']
    }),
    __metadata("design:paramtypes", [])
], AlertsList);
export { AlertsList };
//# sourceMappingURL=../../../../../src/app/alerts/alerts-list/alerts-list.component.js.map