import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {AppComponent} from './app.component'; 
import {APP_BASE_HREF} from '@angular/common';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {ModalModule} from 'ngx-bootstrap';

import {SimpleNotificationsModule} from 'angular2-notifications';  
import { MyTaskModule } from 'src/app/my-task/my-task.module';
import { ServiceModule } from './service/service.module';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ServiceModule,
    BrowserModule,
    FormsModule,
    TableModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule, 
    AngularFontAwesomeModule,  
    ModalModule.forRoot(),
    NgxSpinnerModule,
    TranslateModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    MyTaskModule,
    AppRoutingModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: window["_app_base"] }],

  bootstrap: [AppComponent]
})

export class AppModule {
}

 
