import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetLeaseComponent } from './fleet-lease.component';
import { LeaseFromComponent } from './lease-from/lease-from.component';
import { LeaseToComponent } from './lease-to/lease-to.component';

const routes: Routes = [
  {
    path: 'service/fleet-lease/:service_details_id/:document_id/:tasks_id/:id/:user_roles_id/:task_types_id/:todo_comment/:to_screen',
    component: FleetLeaseComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '1',
        component: LeaseFromComponent,
        pathMatch: 'prefix'
      },
      {
        path: '2',
        component: LeaseToComponent,
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetLeaseRoutingModule { }
