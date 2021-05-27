import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ServiceRoutingModule } from './service-routing.module';
import {ServiceComponent} from './service.component';
import { ArchiveComponent } from './archive/archive.component';
import { TaskLayoutComponent } from './task-layout/task-layout.component';
import {ReactiveFormsModule} from '@angular/forms'
import {ServiceService} from './service.service'
import {SurveyComponent} from './survey.component'
import {TaskModule} from '../task/task.module'
import {TaskService} from '../task/task.service'
import { SidebarModule } from 'ng-sidebar';
import {FileUploadModule} from 'primeng/fileupload';
import { ArchiveTypeComponent } from './archive-type/archive-type.component';
import {FormsModule} from '@angular/forms';
import { FormDisplayComponent } from './form-display/form-display.component'
// import { SimpleNotificationsModule } from "angular2-notifications";
// user001
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { SendToComponent } from './archive/send-to/send-to.component';
import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
 

@NgModule({
  
  imports: [
    
    CommonModule,
    ServiceRoutingModule,
    TableModule,
    ReactiveFormsModule,
    TaskModule,
    SidebarModule.forRoot(),
    FileUploadModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    // SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [ServiceComponent,ArchiveComponent, TaskLayoutComponent,FormDisplayComponent,  SurveyComponent, ArchiveTypeComponent, SendToComponent],
  providers : [ServiceService, TaskService]
})
export class ServiceModule { }
