import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MyTaskModule} from './my-task/my-task.module';
import {ServiceModule} from './service/service.module';
import {APP_BASE_HREF} from '@angular/common';
import {ModalModule} from 'ngx-bootstrap/modal';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    AngularFontAwesomeModule,
    ServiceModule,
    MyTaskModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: window['_app_base']}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
