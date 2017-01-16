import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { AlertDetailComponent }  from './alert.detail.component';

import { AlertService } from './services/alert.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, AlertDetailComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AlertService ]
})
export class AppModule { }
