import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StepperComponent} from "./stepper.component";

import {ApplicationComponent} from "../application/application.component";
import {AuthGuard} from "../../core/guards/auth.guard";


const routes: Routes = [
  {
    path: 'stepper',
    canActivate: [AuthGuard],
    component: StepperComponent,

  },
  {
    path: 'stepper/application',
    loadChildren: () =>
      import('../application/application.module').then(
        (m) => m.ApplicationModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepperRoutingModule {}
