import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatFormFieldModule
  ]
})
export class ProjectModule { }
