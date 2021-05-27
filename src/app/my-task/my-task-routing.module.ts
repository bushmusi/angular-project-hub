import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTaskComponent} from './my-task/my-task.component';
import {SupervisorTaskComponent} from './supervisor-task/supervisor-task.component';
import {TaskComponent} from './task.component';

const routes: Routes = [{
  path: 'task',
  component: TaskComponent,
  pathMatch: 'prefix', children: [
    {
      path: 'MyTask',
      component: MyTaskComponent,
      pathMatch: 'prefix'
    },
    {
      path: 'SupervisorTask',
      component: SupervisorTaskComponent,
      pathMatch: 'prefix'
    }, {
      path: '',
      redirectTo: 'task',
      pathMatch: 'prefix'
    },
    {path: '**', redirectTo: '/task/MyTask', pathMatch: 'prefix'}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTaskRoutingModule {
}
