import {NgModule} from '@angular/core';


import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [

    LoginComponent
  ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        MatProgressSpinnerModule,
    ]
})
export class AuthModule {
}
