import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service/service.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/task/MyTask",
    pathMatch: "prefix",
  },
  { path: "**", redirectTo: "/task/MyTask", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
