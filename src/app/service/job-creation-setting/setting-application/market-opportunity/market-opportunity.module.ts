import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropdownModule,
  FieldsetModule,
  FileUploadModule,
  ListboxModule,
  OrderListModule
} from "primeng/primeng";


@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    ListboxModule,
    OrderListModule
  ],
  declarations: []
})
export class MarketOpportunityModule { }
