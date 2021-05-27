import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ServiceRoutingModule} from './service-routing.module';
import {ServiceComponent} from './service.component';
import {PlotManagmentComponent} from './plot-managment/plot-managment.component';
import {LeaseOwnerShipComponent} from './lease-owner-ship/lease-owner-ship.component';
import {PropertyRegisterComponent} from './property-register/property-register.component';
import {MeasurmentComponent} from './measurment/measurment.component';
import {TitleDeedRegistrationComponent} from './title-deed-registration/title-deed-registration.component';
import {CertificateVersionComponent} from './certificate-version/certificate-version.component';
import {ThemComponent} from './them/them.component';
import {DeptSuspensionRecordComponent} from './dept-suspension-record/dept-suspension-record.component';
import {SurveyComponent} from './task-layout/layout.component';
import {ServiceService} from './service.service';
import {TreeModule} from 'primeng/tree';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CertificateVersionService} from './certificate-version/certificate-version.service';
import {DeptSuspensionRecordService} from './dept-suspension-record/dept-suspension-record.service';
import {LeaseOwnerShipService} from './lease-owner-ship/lease-owner-ship.service';
import {MeasurmentService} from './measurment/measurment.service';
import {PloatManagmentService} from './plot-managment/ploat-managment.service';
import {PropertyRegisterService} from './property-register/property-register.service';
import {ThemService} from './them/them.service';
import {TitleDeedRegistrationService} from './title-deed-registration/title-deed-registration.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoadingComponent} from '../shared/loading/loading.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {TranslateModule} from '@ngx-translate/core';
import {SidebarModule} from 'ng-sidebar';
import {BrowserModule} from '@angular/platform-browser';
import { DemoComponent } from './demo/demo.component';
import {FileUploadModule} from 'primeng/primeng';
import { FormDisplayComponent } from './form-display/form-display.component';
import { PlotComponent } from './plot/plot.component';
import { PropertyComponent } from './property/property.component';
import { CertComponent } from './cert/cert.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ServiceRoutingModule,
    AngularFontAwesomeModule,
    TreeModule,
    TableModule,
    TabsModule.forRoot(),
    CheckboxModule,
    ToastModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forChild({}),
    SidebarModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule
  ],
  declarations: [ServiceComponent, SurveyComponent, PlotManagmentComponent,
    LeaseOwnerShipComponent, PropertyRegisterComponent,
    MeasurmentComponent, TitleDeedRegistrationComponent, CertificateVersionComponent,
    ThemComponent, DeptSuspensionRecordComponent, LoadingComponent, DemoComponent, FormDisplayComponent, PlotComponent, PropertyComponent, CertComponent],
  providers: [ServiceService, MessageService, CertificateVersionService, DeptSuspensionRecordService, LeaseOwnerShipService,
    MeasurmentService, PloatManagmentService, PropertyRegisterService, ThemService, TitleDeedRegistrationService]
})

export class ServiceModule {
}
