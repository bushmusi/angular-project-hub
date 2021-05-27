import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MytaskComponent} from './mytask/mytask.component'
import {TaskComponent} from './task.component'



const routes: Routes = [
  {
    path: '',
    redirectTo: '/task/MyTask', 
    pathMatch: 'prefix'
  },
  {
    path: 'task',
    component: TaskComponent,
    pathMatch: 'prefix', children: [
     
      // {path: '**', redirectTo: '/task/MyTask', pathMatch: 'prefix'}
       {
        path: 'MyTask',
        component: MytaskComponent,
        pathMatch: 'prefix'
      }
     
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
