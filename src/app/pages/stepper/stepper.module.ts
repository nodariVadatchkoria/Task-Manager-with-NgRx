import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { StepperRoutingModule } from './stepper-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { CreateIssueTypesComponent } from './create-issue-types/create-issue-types.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import {NextButtonDirective} from "../../core/directives";

@NgModule({
  declarations: [
    CreateProjectComponent,
    CreateBoardComponent,
    CreateIssueTypesComponent,
    AddUsersComponent,
    StepperComponent,
    NextButtonDirective
  ],
  imports: [
    CommonModule,
    StepperRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatOptionModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class StepperModule {}
