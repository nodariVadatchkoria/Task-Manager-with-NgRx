import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, ToggleSignupService} from "../../../core/services";
import {DOCUMENT} from "@angular/common";
import {fromEvent, Observable} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy, OnInit {

  @Input('scrolled') scrolled!: boolean;

  constructor(
    public router: Router,
    private toggleSignup: ToggleSignupService,
    @Inject(DOCUMENT) private document: Document,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  signUp() {
    this.toggleSignup.toggleVisible()
  }

  navigateToLogin() {
    this.router.navigate(['/auth']);
  }

  menuIsOpened: boolean = false;

  clicks$: Observable<Event> = fromEvent(this.document, 'click');
  clicksSub: any;

  toggleMenu() {
    if(!this.menuIsOpened) {
      this.clicksSub = this.clicks$.subscribe( (event: any) => {  // ???
        if (!event.target.classList.contains('dont-close-from-outside')) {
          this.menuIsOpened = false;
          this.clicksSub.unsubscribe();
        }
      });
    }

    this.menuIsOpened = !this.menuIsOpened
  }

  closeMenu(event: any) {
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' && event.currentTarget.classList.contains('visible')) {
      this.menuIsOpened = false;
    }
  }

  ngOnDestroy() {
    if(this.menuIsOpened) {
      this.clicksSub.unsubscribe();
    }
  }
}
