import {AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {testimonials} from "../../../shared";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit {

  testimonials = testimonials;

  @ViewChildren('content') content!: QueryList<ElementRef>;
  @ViewChildren('indicators') indicators!: QueryList<ElementRef>;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;

  childrenCount: number = 0;
  index: number = 0;
  width: number = 0;

  detectWidth() {
    this.content.forEach((cont: ElementRef, index, array) => {
      this.width = cont.nativeElement.offsetWidth;

      array.length = index + 1; // ლუპი გაეშვება მხოლოდ ერთხელ
    })
  }

  ngAfterViewInit() {
    this.prevBtn.nativeElement.disabled = true;
    this.childrenCount = this.testimonials.length;
    this.detectWidth();
    this.setIndicator(0);
  }

  @HostListener('window:resize')
  onResize() {
    this.detectWidth();
    this.setMarginLeft();
  }

  setMarginLeft() {
    this.content.forEach((cont: ElementRef) => {
      cont.nativeElement.style.marginLeft = -this.index * this.width - this.index * 100 + 'px';
    })

    this.setIndicator(this.index);
  }

  prev() {
    this.index--;
    this.nextBtn.nativeElement.disabled = false;
    this.setMarginLeft();

    if (this.index === 0) {
      this.prevBtn.nativeElement.disabled = true;
    }
  }

  next() {
    this.index++;
    this.prevBtn.nativeElement.disabled = false;
    this.setMarginLeft();

    if (this.index === this.childrenCount - 1) {
      this.nextBtn.nativeElement.disabled = true;
    }
  }

  setIndicator(index: number) {
    this.indicators.forEach((indicator: ElementRef, i) => {
      index === i ? indicator.nativeElement.disabled = true : indicator.nativeElement.disabled = false;
    })

    index === 0 ? this.prevBtn.nativeElement.disabled = true : this.prevBtn.nativeElement.disabled = false;
    index === this.childrenCount - 1 ? this.nextBtn.nativeElement.disabled = true : this.nextBtn.nativeElement.disabled = false;
  }

  indicator(index: number) {
    if (this.index < index) {
      this.index = index;
      this.setMarginLeft();
    } else {
      this.index = index;
      this.setMarginLeft();
    }

    this.setIndicator(index);
  }
}
