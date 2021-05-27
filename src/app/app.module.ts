import { BrowserModule, } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ServiceModule} from './service/service.module'
import {TaskModule} from './task/task.module'
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// import {TaskLayoutModule} from './task-layout/task-layout.module'
// import {SimpleNotificationsModule} from 'angular2-notifications';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { APP_BASE_HREF } from "@angular/common";

import {ModalModule} from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent],
    
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ServiceModule,
    TaskModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: window["_app_base"] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
