import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CardModule } from "primeng/card";
import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from "../shared/loading/loading.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule } from "@ngx-translate/core";
import { SidebarModule } from "ng-sidebar";
import { BrowserModule } from "@angular/platform-browser";
import { TabViewModule } from "primeng/tabview";
import { DemoComponent } from "./demo/demo.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TooltipModule } from "primeng/tooltip";
import { DialogModule } from "primeng/dialog";
import {
  DropdownModule,
  FieldsetModule,
  FileUploadModule,
  ListboxModule,
  OrderListModule
} from "primeng/primeng";
import { FormDisplayComponent } from "./form-display/form-display.component";
import { TvetComponent } from "../service/tvet/tvet.component";
import { TvetApplicationComponent } from "../service/tvet/tvet-application/tvet-application.component";
import { StudentComponent } from "../service/tvet/tvet-application/student/student.component";
import { EnrollmentComponent } from "../service/tvet/tvet-application/enrollment/enrollment.component";
import { SupportingDocumentComponent } from "./tvet/supporting-document/supporting-document.component";
import { MseComponent } from '../service/mse/mse.component';
import { MseApplicationComponent } from '../service/mse/mse-application/mse-application.component';
import { MseEmployeesComponent } from '../service/mse/mse-application/mse-employees/mse-employees.component';
import { MseRegistrationComponent } from '../service/mse/mse-application/mse-registration/mse-registration.component';
import { MseBalanceSheetComponent } from '../service/mse/mse-application/mse-balance-sheet/mse-balance-sheet.component';
import { MarketInputComponent } from '../service/mse/mse-application/market-input/market-input.component';
import { MarketOutputComponent } from '../service/mse/mse-application/market-output/market-output.component';
import { JobCreationSettingComponent } from '../service/job-creation-setting/job-creation-setting.component';
import { SettingApplicationComponent } from '../service/job-creation-setting/setting-application/setting-application.component';
import { JobCreationComponent } from '../service/job-creation-setting/setting-application/job-creation/job-creation.component';
import { LocationComponent } from '../service/job-creation-setting/setting-application/location/location.component';
import { MarketOpportunityComponent } from '../service/job-creation-setting/setting-application/market-opportunity/market-opportunity.component';
import { MarketProductComponent } from '../service/job-creation-setting/setting-application/market-product/market-product.component';
import { ProductComponent } from '../service/job-creation-setting/setting-application/product/product.component';
import { JobCreationService } from '../service/job-creation-setting/setting-application/job-creation/job-creation.service'
import { LocationService } from '../service/job-creation-setting/setting-application/location/location.service'
import { MarketOpportunityModule } from '../service/job-creation-setting/setting-application/market-opportunity/market-opportunity.module'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    AutoCompleteModule,
    ConfirmDialogModule,
    TabViewModule,
    CardModule,
    TooltipModule,
    DialogModule,
    ListboxModule,
    //FileUploadModule,
    FieldsetModule,
    OrderListModule,
    DropdownModule,
    DropdownModule,
    MarketOpportunityModule
  ],
  declarations: [
    ServiceComponent,
    SurveyComponent,
    LoadingComponent,
    DemoComponent,
    TvetComponent,
    TvetApplicationComponent,
    StudentComponent,
    EnrollmentComponent,
    SupportingDocumentComponent,
    MseComponent,
    MseApplicationComponent,
    MseEmployeesComponent,
    MseRegistrationComponent,
    MseBalanceSheetComponent,
    MarketInputComponent,
    MarketOutputComponent,
    JobCreationSettingComponent,
    SettingApplicationComponent,
    JobCreationComponent,
    LocationComponent,
    MarketOpportunityComponent,
    MarketProductComponent,
    ProductComponent,
    FormDisplayComponent
  ],
  providers: [ServiceService, MessageService, JobCreationService,LocationService]
})
export class ServiceModule {}
