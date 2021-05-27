import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ServiceModule} from './service/service.module';
import {TaskModule} from './task/task.module';
import {ModalModule} from 'ngx-bootstrap/modal';

// Validation form

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { APP_BASE_HREF } from "@angular/common";

//toast message 
// toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    TaskModule,
    ReactiveFormsModule, //This is for val idation
    FormsModule,
    ModalModule.forRoot(),
    //toast are below
    BrowserAnimationsModule,

    ToastrModule.forRoot()
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: window["_app_base"] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
