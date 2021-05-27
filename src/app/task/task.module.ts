import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { TaskRoutingModule } from './task-routing.module';
import {FormsModule} from '@angular/forms';
import{MyTaskComponent} from './my-task/my-task.component'
import {TaskService} from './task.service'
import { HttpClientModule} from '@angular/common/http';
import {TaskComponent} from './task.component'




@NgModule({
  declarations: [
    MyTaskComponent,
    TaskComponent
 
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    TableModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[TaskService]
})
export class TaskModule { }
