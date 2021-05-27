import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ServiceRoutingModule} from './service-routing.module';
import {ServiceComponent} from './service.component';
import {ServiceService} from './service.service';
import {TreeModule} from 'primeng/tree';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoadingComponent} from '../shared/loading/loading.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {TranslateModule} from '@ngx-translate/core';
import {SidebarModule} from 'ng-sidebar';
import {BrowserModule} from '@angular/platform-browser';
import {FileUploadModule} from 'primeng/fileupload';
import { FormDisplayComponent } from './form-display/form-display.component';

import { StrategicThemesComponent } from './strategic-themes/strategic-themes.component';
import { ASPWithPerspectiveGoalComponent } from './asp-with-perspective-goal/asp-with-perspective-goal.component';
import { ASPAssignmentComponent } from './asp-assignment/asp-assignment.component';
import { InitiativePlanAssignmentComponent } from './initiative-plan-assignment/initiative-plan-assignment.component';
import { KeyPerformanceIndicatorComponent } from './key-performance-indicator/key-performance-indicator.component';
import { PerspectivesComponent } from './perspectives/perspectives.component';
import { SurveyComponent } from './task-layout/layout.component';
import { DemoComponent } from './demo/demo.component';
import { FormNotFoundComponent } from '../shared/form-not-found/form-not-found.component';
import { KeyPerformanceIndicatorGoalMappingComponent } from './key-performance-indicator-goal-mapping/key-performance-indicator-goal-mapping.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';

import {TooltipModule} from 'primeng/tooltip';

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
    FileUploadModule,TooltipModule
  ],
  declarations: [ServiceComponent, SurveyComponent, LoadingComponent,
    FormDisplayComponent, StrategicThemesComponent,
     ASPWithPerspectiveGoalComponent,
     ASPAssignmentComponent, InitiativePlanAssignmentComponent,
     KeyPerformanceIndicatorComponent,
     PerspectivesComponent,
     FormNotFoundComponent,
     DemoComponent,KeyPerformanceIndicatorGoalMappingComponent,DataCollectionComponent],
  providers: [ServiceService, MessageService]
})

export class ServiceModule {
}
