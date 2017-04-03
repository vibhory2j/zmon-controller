import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { AlertsList }  from './alerts/alerts-list/alerts-list.component';


import { AlertService } from './services/alert.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, MaterialModule ],
  declarations: [ AppComponent, AlertsList ],
  bootstrap:    [ AppComponent ],
  providers:    [ AlertService ]
})

export class AppModule { }
