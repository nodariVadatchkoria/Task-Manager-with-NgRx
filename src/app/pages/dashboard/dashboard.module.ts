import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {HomeModule} from "../home/home.module";
import {FormsModule} from "@angular/forms";
import { BoardComponent } from './board/board.component';
import {CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HomeModule,
        FormsModule,
        DragDropModule,
        MatButtonModule
    ]
})
export class DashboardModule { }
