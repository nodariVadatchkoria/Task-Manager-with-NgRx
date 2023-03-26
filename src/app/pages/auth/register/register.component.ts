import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {checkPasswordValidator} from "../../../core/validators/form.validators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements AfterViewInit, OnInit {



  form: FormGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
      lastName: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), this.noWhitespaceValidator]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(6), this.noWhitespaceValidator]),
    }, {validators: checkPasswordValidator}
  );
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  mobile: boolean = false;
  diameter: number = 30;
  spinner: boolean = false;

  ngOnInit() {
    window.innerWidth <= 1024 ? this.mobile = true : this.mobile = false;
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe(params => {
      params.get('email') ? this.form.get('email')?.setValue(params.get('email')) : null;
    });
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.spinner = true;
    this.authService.register(this.form.value)
      .subscribe(res => {
        this.router.navigate(['/auth/login'], {queryParams: {email: this.form.get('email')!.value, fromRegistration: true}});
        console.log(res)
      })
  }
}
