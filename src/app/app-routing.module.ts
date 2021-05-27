import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListInventoryComponent } from "./service/list-inventory/list-inventory.component";
import { ListVendorComponent } from "./service/list-vendor/list-vendor.component";
import { ListCustomerComponent } from "./service/list-customer/list-customer.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/task/MyTask",
    pathMatch: "full",
  },

  {
    path: "19",
    component: ListInventoryComponent,
    pathMatch: "prefix",
  },
  {
    path: "17",
    component: ListVendorComponent,
    pathMatch: "prefix",
  },
  {
    path: "18",
    component: ListCustomerComponent,
    pathMatch: "prefix",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
