import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
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
import {
  FileUploadModule,
  AutoCompleteModule,
  DropdownModule,
  TabMenuModule,
  TabView,
  TabViewModule,
} from "primeng/primeng";
import { FormDisplayComponent } from "./form-display/form-display.component";
import { MaintainInventoryItemComponent } from "../service/maintain-InventoryItem/maintain-InventoryItem.component";
import { MaintainVendorComponent } from "../service/maintain-vendor/maintain-vendor.component";
import { MaintainCustomerComponent } from "./maintain-customer/maintain-customer.component";
import { SurveyComponent } from "./task-layout/layout.component";
import { ListCustomerComponent } from "./list-customer/list-customer.component";
import { ListVendorComponent } from "./list-vendor/list-vendor.component";
import { ListInventoryComponent } from "./list-inventory/list-inventory.component";
import { CustomerDefaultComponent } from "./customer-default/customer-default.component";
import { DefaultInventoryComponent } from "./default-inventory/default-inventory.component";
import { DefaultVendorComponent } from "./default-vendor/default-vendor.component";
import { DemoComponent } from "./demo/demo.component";
import { MaintainCustomerService } from "./maintain-customer/maintain-customer.service";
import { MaintainVendorService } from "./maintain-vendor/maintain-vendor.service";
import { MaintainInventoryitemService } from "./maintain-InventoryItem/maintain-inventoryitem.service";
import { VendorPostingGroupComponent } from "../service/vendor-posting-group/vendor-posting-group.component";
import { TaxProdPostingGroupComponent } from "../service/tax-prod-posting-group/tax-prod-posting-group.component";
import { TaxBusPostingGroupComponent } from "../service/tax-bus-posting-group/tax-bus-posting-group.component";
import { InventoryPostingGroupComponent } from "../service/inventory-posting-group/inventory-posting-group.component";
import { GeneralProductPostingGroupComponent } from "../service/general-product-posting-group/general-product-posting-group.component";
import { FixedAssetPostingGroupComponent } from "../service/fixed-asset-posting-group/fixed-asset-posting-group.component";
import { WithholdingComponent } from "../service/withholding/withholding.component";
import { GeneralPostingSetupComponent } from "./general-posting-setup/general-posting-setup.component";
import { InventoryPostingSetupComponent } from "./inventory-posting-setup/inventory-posting-setup.component";
import { TaxPostingSetUpComponent } from "./tax-posting-set-up/tax-posting-set-up.component";
import { WithholdPostingSetupComponent } from "./withhold-posting-setup/withhold-posting-setup.component";
import { MaintainEmployeeComponent } from "./maintain-employee/maintain-employee.component";
import { ListEmployeeComponent } from '../service/list-employee/list-employee.component';
import { BankReconciliationComponent } from './bank-reconciliation/bank-reconciliation.component';
import { MaintianBankReconciliationComponent } from './maintian-bank-reconciliation/maintian-bank-reconciliation.component';
import { CustomerPostingGroupComponent } from './customer-posting-group/customer-posting-group.component';
import { GeneralBusinessPostingGroupComponent } from './general-business-posting-group/general-business-posting-group.component';
import { InsuranceTypeComponent } from '../service/insurance-type/insurance-type.component';
import { AccountTypeComponent } from '../service/account-type/account-type.component';
import { AccountCategoryComponent } from '../service/account-category/account-category.component';
import { TransactionSalesTypeComponent } from '../service/transaction-sales-type/transaction-sales-type.component';
import { PayFrequencyTypeComponent } from './pay-frequency-type/pay-frequency-type.component';
import { BankAccountPostingGroupComponent } from '../service/bank-account-posting-group/bank-account-posting-group.component';

import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { CurrencyTypeService } from './currency-type/currency-type.service';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component'
import { UnitOfMeasureService } from './unit-of-measure/unit-of-measure.service'
import {DialogModule} from 'primeng/dialog'; //for 

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
    AutoCompleteModule,
    DropdownModule,
    ReactiveFormsModule,
    DialogModule
  ],
  declarations: [
    MaintainCustomerComponent,
    MaintainVendorComponent,
    MaintainInventoryItemComponent,
    ServiceComponent,
    LoadingComponent,
    FormDisplayComponent,
    SurveyComponent,
    ListCustomerComponent,
    ListVendorComponent,
    ListInventoryComponent,
    CustomerDefaultComponent,
    DefaultInventoryComponent,
    DefaultVendorComponent,
    DemoComponent,
    VendorPostingGroupComponent,
    TaxProdPostingGroupComponent,
    TaxBusPostingGroupComponent,
    InventoryPostingGroupComponent,
    GeneralProductPostingGroupComponent,
    FixedAssetPostingGroupComponent,
    WithholdingComponent,
    MaintainEmployeeComponent,
    BankReconciliationComponent,
    MaintianBankReconciliationComponent,

    //From Abiy
    GeneralPostingSetupComponent,
    InventoryPostingSetupComponent,
    TaxPostingSetUpComponent,
    WithholdPostingSetupComponent,
    ListEmployeeComponent,
    CustomerPostingGroupComponent,
    GeneralBusinessPostingGroupComponent,
    InsuranceTypeComponent,
    AccountTypeComponent,
    AccountCategoryComponent,
    TransactionSalesTypeComponent,
    PayFrequencyTypeComponent,
    BankAccountPostingGroupComponent,
    CurrencyTypeComponent,
    UnitOfMeasureComponent,
  ],
  providers: [
    ServiceService,
    MessageService,
    MaintainCustomerService,
    MaintainVendorService,
    MaintainInventoryitemService,
    CurrencyTypeService,
    UnitOfMeasureService,
  ],
})
export class ServiceModule {}
