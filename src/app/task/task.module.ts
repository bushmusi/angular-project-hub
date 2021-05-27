import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskComponent} from './task.component'
import { TaskRoutingModule } from './task-routing.module';
import { MytaskComponent } from './mytask/mytask.component';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import  {TaskService} from './task.service'


@NgModule({
  declarations: [TaskComponent, MytaskComponent],
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
