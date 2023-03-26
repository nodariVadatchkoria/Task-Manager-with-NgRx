import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//თუ მომხმარებელი ავტორიზირებულია ჰოუმ პეიჯის ნაცვლად პირდაპირ აპლიკაციაზე გადაამისამართებს
//თუ არა ჰოუმ პეიჯზე გაუშვებს სადაც იქნება ავტორიზაცია - რეგისტრაციის ლინკები
//ავტორიზაციის წარმატებით გავლის შემდეგ ამ ცვლადს შევცვლით
let isAuthorised = true;

import { PageNotFoundComponent } from './pages/404-error/page-not-found/page-not-found.component';
import {PermissionGuard} from "./core/guards/permission.guard";

const routes: Routes = [
  {
    path: '',

    // loadChildren: () => isAuthorised ? import('./pages/application/application.module').then(m => m.ApplicationModule) :
    //   import('./pages/home/home.module').then(m => m.HomeModule),

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },

      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/stepper/stepper.module').then((m) => m.StepperModule),
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main-layout/main-layout.module').then(
            (m) => m.MainLayoutModule
          ),
      },
      {
        path: 'application',
        loadChildren: () =>
          import('./pages/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        canActivate: [PermissionGuard],
        data: {
          permissions: ['user:list']
        },
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
  ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    isAuthorised = false;
  }
}
