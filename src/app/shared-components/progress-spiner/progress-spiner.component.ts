import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SetSpinnerSizeDirective} from "../../core/directives";

@Component({
  selector: 'app-progress-spinner',
  template: '<mat-spinner color="accent" [diameter]="diameter" setSpinnerSize></mat-spinner>',
  styles:  ['mat-spinner {margin: auto}'],
  imports: [
    MatProgressSpinnerModule,
    SetSpinnerSizeDirective
  ],
  standalone: true
})
export class ProgressSpinnerComponent {
  diameter?: number = 20;
}
