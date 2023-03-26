import {Component} from '@angular/core';
import {AuthService} from "../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(
     public window: Window,
     private auth: AuthService,
     private router: Router
  ) {
  }

  navigateToHome() {
    this.auth.getToken() ?  this.router.navigate(['/application']) : this.router.navigate(['']);
  }
}
