import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
import { PlotManagmentComponent } from "./plot-managment/plot-managment.component";
import { LeaseOwnerShipComponent } from "./lease-owner-ship/lease-owner-ship.component";
import { PropertyRegisterComponent } from "./property-register/property-register.component";
import { MeasurmentComponent } from "./measurment/measurment.component";
import { TitleDeedRegistrationComponent } from "./title-deed-registration/title-deed-registration.component";
import { CertificateVersionComponent } from "./certificate-version/certificate-version.component";
import { ThemComponent } from "./them/them.component";
import { DeptSuspensionRecordComponent } from "./dept-suspension-record/dept-suspension-record.component";
import { SurveyComponent } from "./task-layout/layout.component";
import { ServiceService } from "./service.service";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { CertificateVersionService } from "./certificate-version/certificate-version.service";
import { DeptSuspensionRecordService } from "./dept-suspension-record/dept-suspension-record.service";
import { LeaseOwnerShipService } from "./lease-owner-ship/lease-owner-ship.service";
import { MeasurmentService } from "./measurment/measurment.service";
import { PloatManagmentService } from "./plot-managment/ploat-managment.service";
import { PropertyRegisterService } from "./property-register/property-register.service";
import { ThemService } from "./them/them.service";
import { TitleDeedRegistrationService } from "./title-deed-registration/title-deed-registration.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from "../shared/loading/loading.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule } from "@ngx-translate/core";
import { SidebarModule } from "ng-sidebar";
import { BrowserModule } from "@angular/platform-browser";
import { DemoComponent } from "./demo/demo.component";
import { FileUploadModule } from "primeng/primeng";
import { FormDisplayComponent } from "./form-display/form-display.component";
import { PlotComponent } from "./plot/plot.component";
import { PropertyComponent } from "./property/property.component";
import { CertComponent } from "./cert/cert.component";
import { MaintainInventoryItemComponent } from "../service/maintain-InventoryItem/maintain-InventoryItem.component";
import { ListInventoryComponent } from "./list-inventory/list-inventory.component";
import { DefaultInventoryComponent } from "../service/default-inventory/default-inventory.component";
import { DefaultVendorComponent } from "../service/default-vendor/default-vendor.component";
import { MaintainVendorComponent } from "../service/maintain-vendor/maintain-vendor.component";
import { ListVendorComponent } from "./list-vendor/list-vendor.component";
import { CustomerDefaultComponent } from "../service/customer-default/customer-default.component";
import { ListCustomerComponent } from "./list-customer/list-customer.component";
import { MaintainCustomerComponent } from "./maintain-customer/maintain-customer.component";
import { EsriMapComponent } from "./esri-map/esri-map.component";
import { LeaseToComponent } from "../fleet-lease/lease-to/lease-to.component";
import { LeaseFromComponent } from "../fleet-lease/lease-from/lease-from.component";
import { ListVehicleComponent } from "../fleet-lease/list-vehicle/list-vehicle.component";
import { VehicleService } from "../fleet-lease/vehicle.service";

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
    FileUploadModule,
  ],
  declarations: [
    MaintainCustomerComponent,
    EsriMapComponent,
    ListCustomerComponent,
    CustomerDefaultComponent,
    MaintainVendorComponent,
    ListVendorComponent,
    DefaultVendorComponent,
    DefaultInventoryComponent,
    ListInventoryComponent,
    MaintainInventoryItemComponent,
    ServiceComponent,
    SurveyComponent,
    PlotManagmentComponent,
    LeaseOwnerShipComponent,
    PropertyRegisterComponent,
    MeasurmentComponent,
    TitleDeedRegistrationComponent,
    CertificateVersionComponent,
    ThemComponent,
    DeptSuspensionRecordComponent,
    LoadingComponent,
    DemoComponent,
    FormDisplayComponent,
    PlotComponent,
    PropertyComponent,
    CertComponent,
    LeaseToComponent,
    LeaseFromComponent,
    ListVehicleComponent,
  ],
  providers: [
    ServiceService,
    MessageService,
    CertificateVersionService,
    DeptSuspensionRecordService,
    LeaseOwnerShipService,
    MeasurmentService,
    PloatManagmentService,
    PropertyRegisterService,
    ThemService,
    TitleDeedRegistrationService,
    VehicleService
  ],
})
export class ServiceModule {}
