import {Injectable, OnDestroy} from '@angular/core';
import {of, Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidCounterService implements OnDestroy {

  constructor() {
  }

  firstChecked: boolean = false;
  array: number[] = []
  arraySubject = new Subject<number[]>()
  counter = 0;
  controls = 0;
  button?: any;

  private sub$ = new Subject();

  validCounter(formGroup: FormGroup, index: number) {
    this.button = document.querySelectorAll('.next-button');
    if (!this.firstChecked) {
      this.firstCheck(formGroup, index)
    }
    for (let i = 0; i < Object.keys(formGroup.value).length; i++) {
      formGroup.get(Object.keys(formGroup.value)[i])?.valueChanges
        .pipe(takeUntil(this.sub$))
        .subscribe(c => {
          this.counter = 0;
          this.array = [];
          this.firstCheck(formGroup, index);
        })
    }
  }

  firstCheck(formGroup: FormGroup, index: number) {
    this.controls = Object.keys(formGroup.value).length;
    this.firstChecked = true;
    for (let i = 0; i < Object.keys(formGroup.value).length; i++) {
      of(formGroup.get(Object.keys(formGroup.value)[i]))
        .pipe(takeUntil(this.sub$))
        .subscribe(control => {
          if (control?.valid) {
            this.counter++;
            this.array.push(this.counter);
            this.arraySubject.next(this.array);
          }
        })
    }

    this.setButtonWidth(index)
  }

  setButtonWidth(index: number) {
    const button = this.button[index] as HTMLElement;
    button.style.width = this.counter / this.controls * 100 + '%';
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
