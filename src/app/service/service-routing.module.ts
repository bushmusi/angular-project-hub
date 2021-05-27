import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceComponent} from './service.component';

const routes: Routes = [
  {
    path: 'service/:id',
    component: ServiceComponent,
    pathMatch: 'prefix'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {
}
