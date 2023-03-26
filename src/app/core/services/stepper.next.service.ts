import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepperNextService {
  // Next Step
  nextStep = new BehaviorSubject<number>(0);

  nextStepOpen$: Observable<number> = this.nextStep.asObservable();

  openNextStep(step: number) {
    this.nextStep.next(step);
  }

  // Linear
  linear = new BehaviorSubject<boolean>(true);
  isLinear$: Observable<boolean> = this.linear.asObservable();

  changeToLinear() {
    this.linear.next(true);
  }

  changeFromLinear() {
    this.linear.next(false);
  }

  // complete state
  complete = new BehaviorSubject<boolean>(false);
  isCompleted$: Observable<boolean> = this.complete.asObservable();
}
