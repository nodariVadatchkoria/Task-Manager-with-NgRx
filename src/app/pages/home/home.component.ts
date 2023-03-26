import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {

  scrolled: boolean = false;
  scrolledTop: boolean = false;

  @ViewChild('home') home!: ElementRef;

  ngAfterViewInit() {
    this.home.nativeElement.addEventListener('scroll', () => {
      let firstElPos = this.home.nativeElement.firstChild.getBoundingClientRect().top;
      firstElPos <= -10 ? this.scrolled = true : this.scrolled = false;
      firstElPos <= -window.innerHeight ? this.scrolledTop = true : this.scrolledTop = false;
    })
  }
}
