import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footer') footer!: ElementRef;

  constructor(public router: Router) {
  }

  foot?: any;

  ngAfterViewInit() {
    this.foot = this.footer.nativeElement;

    let footer$: Observable<any> = fromEvent(this.foot, "mousemove");

    footer$.subscribe(event => {
      this.onMouseMove(event)
    })
  }

  onMouseMove(event: any) {
    let percentage = Math.floor(event.clientX / window.innerWidth * 100);

    event.currentTarget.style.background = `
    linear-gradient(97deg, rgba(207,60,190,1) 0%,
    rgba(133,33,243,1) ${percentage}%,
    rgba(207,60,190,1) 100%)`;
  }


}
