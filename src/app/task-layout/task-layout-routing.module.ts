import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskLayoutComponent} from './task-layout.component'


const routes: Routes = [
  {
     
    path: 'layout/:appCode/:docId/:tskId/:toDoId/:usrRolId/:tskType/:toDoCom/:formcode',
    component : TaskLayoutComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskLayoutRoutingModule { }
