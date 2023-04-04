import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserEditComponent} from "./user-add-edit/user-edit.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./store ";


@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
      StoreModule.forFeature('user' , userReducer),
  ],
  exports: [UserEditComponent]
})
export class UserModule { }
