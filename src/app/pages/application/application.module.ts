import {InjectionToken, isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicationComponent} from "./application.component";
import {ApplicationRoutingModule} from "./application-routing.module";
import { ProjectComponent } from './project/project.component';
import {HomeModule} from "../home/home.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatButtonModule} from "@angular/material/button";
import { ProjectCurrentComponent } from './current-project/project-current.component';
import {ReducerManager, StoreModule} from "@ngrx/store";
import {ProjectEffects, projectReducer} from "../../store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
    declarations: [
        ApplicationComponent,
        ProjectComponent,
        SideMenuComponent,
        ProjectEditComponent,
        ProjectCurrentComponent
    ],
    exports: [
        ProjectComponent
    ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        HomeModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        NgxMatColorPickerModule,
        ReactiveFormsModule,
        MatButtonModule,


        // StoreModule.forFeature('project' , projectReducer),
        //
        // EffectsModule.forFeature([ProjectEffects]),
        // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    ]

})
export class ApplicationModule { }
