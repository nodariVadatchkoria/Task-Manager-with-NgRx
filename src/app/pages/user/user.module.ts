import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PermissionsDirective} from "../../core/directives/permissions.directive";
import {StoreModule} from "@ngrx/store";
import {UserEffects, userReducer} from "./store ";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    UsersComponent,
    UserRoleComponent,
    UserAddEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    PermissionsDirective,
    StoreModule.forFeature('user' , userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [
    UserAddEditComponent
  ]
})
export class UserModule { }
