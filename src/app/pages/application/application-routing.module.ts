import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationComponent} from "./application.component";

import {ProjectComponent} from "./project/project.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectCurrentComponent} from "./current-project/project-current.component";
import {AuthGuard} from "../../core/guards/auth.guard";


const routes: Routes = [

  {
    path: '',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'project',
        canActivate: [AuthGuard],
        component: ProjectComponent
      },
      {
        path:'current',
        component: ProjectCurrentComponent
      },
      {
        path: ':id',
        component: ProjectEditComponent
      },
      {
        path: 'setting',
        loadChildren: () => import('./project-setting/project-setting.module').then(m => m.ProjectSettingModule)
      },
      {
        path: 'main',
        loadChildren: () => import('src/app/pages/main-layout/main-layout.module').then(m => m.MainLayoutModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('src/app/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      }


    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
