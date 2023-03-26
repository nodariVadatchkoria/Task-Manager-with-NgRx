import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CheckMailService, ToggleSignupService} from "../../../core/services";

@Component({
  selector: 'app-home-sign-up',
  templateUrl: './home-sign-up.component.html',
  styleUrls: ['./home-sign-up.component.scss']
})
export class HomeSignUpComponent {

  constructor(
    private router: Router,
    public toggleSignup: ToggleSignupService,
    private checkMail: CheckMailService
  ) { }

  email: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] )
  })

  touched: boolean = false;
  exists?: boolean;
  diameter: number = 30;
  spinner: boolean = false;

  checkEmail(email: string) {
    this.checkMail.checkMail({email: email}).subscribe(res => {
      res.exists ? this.router.navigate(['../auth/login'], {queryParams: {email: email}}) : this.router.navigate(['../auth/register'], {queryParams: {email: email}})
    })
  }

  onSubmit() {
    this.touched = true;
    this.email.get('email')?.markAsTouched();

    setTimeout(()=>{
      this.touched = false;
      this.email.get('email')?.markAsUntouched();
    }, 4000)

    let email = this.email.get('email')?.value

    if(this.email.valid) {
      this.spinner = true;
      this.checkEmail(email);
    }
  }

  focus() {
    this.touched = false;
  }

}
