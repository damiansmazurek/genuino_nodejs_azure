import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {NavigationComponent} from './navigation/navigation.component'
import {OnlineComponent} from './online/online.component'
import { routing } from './app.routing';
@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ AppComponent, NavigationComponent, OnlineComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }