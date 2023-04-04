import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperNextService } from 'src/app/core/services/stepper.next.service';
import { UsersService } from 'src/app/core/services/users.service';
import {ValidCounterService} from "../../../core/services/valid-counter.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit, AfterViewInit {
  constructor(
    private _formBuilder: FormBuilder,
    private stepperService: StepperNextService,
    private usersService: UsersService,
    private validCounter: ValidCounterService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.usersFormGroup.get('firstName')?.setValue('ss');
    this.usersComponent(3);
    this.usersFormGroup.get('firstName')?.setValue('');
  }

  usersComponent(index: number) {
    this.validCounter.validCounter(this.usersFormGroup, index);
  }

  usersFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    identityNumber: ['', [Validators.required, Validators.minLength(11)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    mobileNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+'),
      ],
    ],
    isActive: [true],
  });
  isEditable = true;

  onSubmit() {
    this.stepperService.changeFromLinear();

    this.stepperService.openNextStep(4);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 1000);

    //
    this.usersService.setUser(this.usersFormGroup.value).subscribe({
      next: (res) => console.log(res),
    });
  }

  goBack() {
    this.stepperService.changeFromLinear();
    this.stepperService.openNextStep(2);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 500);
    if (this.usersFormGroup.valid) {
      this.stepperService.complete.next(true);
    }
    this.stepperService.complete.next(false);
  }
}
