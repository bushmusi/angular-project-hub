import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskLayoutRoutingModule } from './task-layout-routing.module';
import {SurveyComponent} from './survey.component'
import {TaskLayoutComponent} from './task-layout.component'
import {TaskModule} from '../task/task.module'
import { TaskService } from '../task/task.service';


@NgModule({
  declarations: [SurveyComponent, TaskLayoutComponent ],
  imports: [
    CommonModule,
    TaskLayoutRoutingModule,
    TaskModule
  ],
  providers:[TaskService] 
})
export class TaskLayoutModule { }
