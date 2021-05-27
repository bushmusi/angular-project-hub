import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceComponent} from './service.component'
import {TaskLayoutComponent} from './task-layout/task-layout.component'


const routes: Routes = [
  {
    path: ':service_Code/:TaskCode/:Form_Code',
    component : ServiceComponent,
    pathMatch: 'prefix'
  },
  // {
     
  //   path: 'layout/:appCode/:docId/:tskId/:toDoId/:usrRolId/:tskType/:toDoCom/:formcode',
  //   component : TaskLayoutComponent,
  //   pathMatch: 'prefix'
  // },
  {
     
    path: 'layout/:appCode/:docId/:TaskCode/:toDoId/:usrRolId/:tskType/:toDoCom/:Form_Code',
    component : ServiceComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
