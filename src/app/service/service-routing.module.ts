import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { FormDisplayComponent } from './form-display/form-display.component';

const routes: Routes = [
  {
    path: 'service',
    component: FormDisplayComponent
  },
  
  {
    path: 'service/:formcode',
    component: ServiceComponent
  },

  {
    path: 'services/:id/:AppNo/:tskTyp/:tskID/:docid/:todoID',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },

  {
    path: 'services/:id/:AppNo/:tskTyp/:tskID/:docid/:todoID/:formcode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    path: ':id/:tskID/:formcode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }