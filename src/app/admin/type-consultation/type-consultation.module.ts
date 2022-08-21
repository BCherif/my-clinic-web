import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeConsultationComponent} from "./type-consultation.component";
import {TypeConsultationRouting} from "./type-consultation-routing";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [TypeConsultationComponent],
  imports: [
    CommonModule,
    TypeConsultationRouting,
    SharedModule
  ]
})
export class TypeConsultationModule { }
