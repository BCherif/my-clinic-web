
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {TypeConsultationComponent} from "./type-consultation.component";
const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "types",
  //   pathMatch: "full",
  // },
  {
    path: "",
    component: TypeConsultationComponent,
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeConsultationRouting {}
