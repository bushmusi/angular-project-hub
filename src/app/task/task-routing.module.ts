import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyTaskComponent} from './my-task/my-task.component'
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
        component: MyTaskComponent,
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
