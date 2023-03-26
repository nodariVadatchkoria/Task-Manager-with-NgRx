import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectEpicAddEditComponent } from './containers/project-epic-add-edit/project-epic-add-edit.component';
import { ProjectSettingComponent } from './project-setting.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { IssueTypesComponent } from './containers/issue-types/issue-types.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ConfirmDeleteModule} from "../../../shared/confirm-delete/confirm-delete.module";

import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import { IssueTypeAddEditComponent } from './containers/issue-type-add-edit/issue-type-add-edit.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    ProjectEpicsComponent,
    ProjectEpicAddEditComponent,
    ProjectSettingComponent,
    IssueTypesComponent,
    IssueTypeAddEditComponent,

  ],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule,
    ConfirmDeleteModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
    FontAwesomeModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,

  ]
})
export class ProjectSettingModule { }
