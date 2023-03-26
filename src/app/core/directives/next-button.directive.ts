import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appNextButton]',
})
export class NextButtonDirective implements AfterViewInit {

  constructor(
    private elRef: ElementRef,
  ) {
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.setAttribute('style', 'position: absolute; bottom: 20px; right: 20px; width: 100px; border-radius: 5px; overflow: hidden');

    const div = document.createElement('div');
    div.setAttribute('style', 'height: 100%; position: absolute; left: 0; top: 0; background: #7A1DE0; transition: .5s');
    div.classList.add('next-button');
    this.elRef.nativeElement.appendChild(div);
  }
}
