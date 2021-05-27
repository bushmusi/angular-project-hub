import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyTaskModule } from "./my-task/my-task.module";
import { ServiceModule } from "./service/service.module";
import { APP_BASE_HREF } from "@angular/common";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "../environments/environment";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { ModalModule } from "ngx-bootstrap";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBF_d08s4tWcPYNl6zxdVC4Je2_gZYjki0",
    }),
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
        deps: [HttpClient],
      },
    }),
    NgxSmartModalModule.forRoot(),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: window["_app_base"] }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.phisicalPath, ".json");
}
