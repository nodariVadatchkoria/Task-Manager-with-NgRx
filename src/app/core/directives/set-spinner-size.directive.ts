import {AfterViewInit, Directive, ElementRef, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[setSpinnerSize]',
  standalone: true
})
export class SetSpinnerSizeDirective implements AfterViewInit {

  constructor(
    private elRef: ElementRef
  ) {
  }

  ngAfterViewInit() {
    let parent = this.elRef.nativeElement.parentElement.parentElement;
    let height = parent.getBoundingClientRect().height;
    let spinnerRadius = height - 10 - 20;

    this.elRef.nativeElement.setAttribute('style', `width: ${spinnerRadius}px; height: ${spinnerRadius}px`);
  }
}
