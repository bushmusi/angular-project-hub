import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceComponent} from './service.component'
import { ServiceRoutingModule } from './service-routing.module';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import {ServiceService} from './service.service';
import {ActualBudgetService} from './actual-budget/actual-budget.service'
import { BudgetTypeComponent } from './budget-type/budget-type.component';
import {BudgetSummraizedComponent} from './budget-summraized/budget-summraized.component'
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import {TaskModule} from '../task/task.module'
import { TaskService } from '../task/task.service';
import {SurveyComponent} from './survey.component'
import {TaskLayoutComponent} from './task-layout/task-layout.component'
import { SidebarModule } from 'ng-sidebar';
import {FileUploadModule} from 'primeng/fileupload';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
 import {FormsModule} from '@angular/forms';

import {ToastModule} from 'primeng/toast';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {MessageService} from 'primeng/api';


import {BrowserModule} from '@angular/platform-browser';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

import {DialogModule} from 'primeng/dialog'; //for 

import { BudgetDetailModule } from './budget-detail/budget-detail.module'

import { BudgetComponent } from './budget-detail/budget/budget.component'

import { ProcSideNavbarComponent } from './budget-detail/proc-side-navbar/proc-side-navbar.component'

import {CardModule} from 'primeng/card';

import {TreeModule} from 'primeng/tree';

import { OrgSideNavbarComponent } from './org-side-navbar/org-side-navbar.component';

import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonModule } from 'primeng/button';
import { ActualBudgetComponent } from './actual-budget/actual-budget.component';
import { from } from 'rxjs';







@NgModule({
  declarations: [
    BudgetComponent,
    ServiceComponent,
    BudgetTypeComponent,
    BudgetSummraizedComponent,
    BudgetDetailComponent,
    TaskLayoutComponent,
    SurveyComponent,
    SideNavbarComponent,
    OrgSideNavbarComponent,
    ProcSideNavbarComponent,
    ActualBudgetComponent
  
    // LiComponent
    
  
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    ServiceRoutingModule,
    TableModule,
    ReactiveFormsModule,
    TaskModule,
    SidebarModule.forRoot(),
    FileUploadModule,
    NgbModule,
    FormsModule,
    ToastModule,
    SimpleNotificationsModule.forRoot(),
    DialogModule,
    ButtonModule,
    BudgetDetailModule,
    CardModule,
    TreeModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
   
  
    
  ],
  providers : [ServiceService, TaskService,MessageService,ActualBudgetService]
})
export class ServiceModule { }
