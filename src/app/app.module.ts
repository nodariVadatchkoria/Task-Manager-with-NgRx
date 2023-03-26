import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {PageNotFoundComponent} from './pages/404-error/page-not-found/page-not-found.component';
import {ProjectInterceptor} from './core/interceptors/project.interceptor';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS} from "@angular-material-components/color-picker";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskAddEditComponent } from './shared/task-add-edit/task-add-edit.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        TaskAddEditComponent,

    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
  ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: Window,
            useValue: window
        },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProjectInterceptor,
            multi: true
        },
      { provide: MAT_COLOR_FORMATS,
        useValue: NGX_MAT_COLOR_FORMATS }

    ],
    bootstrap: [AppComponent],


})

export class AppModule {
}
