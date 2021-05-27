import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetLeaseRoutingModule } from './fleet-lease-routing.module';
import { FleetLeaseComponent } from './fleet-lease.component';
import { LeaseFromComponent } from './lease-from/lease-from.component';
import { LeaseToComponent } from './lease-to/lease-to.component';

@NgModule({
  imports: [
    CommonModule,
    FleetLeaseRoutingModule
  ],
  declarations: [FleetLeaseComponent]
})
export class FleetLeaseModule { }
