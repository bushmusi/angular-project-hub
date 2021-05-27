import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceComponent} from './service/service.component'
const routes: Routes = [
  // {
  //   path: ':service_Code/:TaskCode/:Form_Code',
  //   component : ServiceComponent,
  //   pathMatch: 'prefix'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
