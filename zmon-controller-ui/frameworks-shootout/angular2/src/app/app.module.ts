import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AlertService } from './alert.service';
import { AlertsListComponent } from './alerts-list/alerts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [ AlertService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
