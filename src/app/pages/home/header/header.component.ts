import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {CheckMailService} from "../../../core/services";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private router: Router,
    private checkMail: CheckMailService
  ) { }



  ngOnInit(): void {
  }

  spinner: boolean = false;
  diameter: number = 30;


  email: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] )
  })

  touched: boolean = false;
  exists?: boolean;

  checkEmail(email: string) {
    this.checkMail.checkMail({email: email}).subscribe(res => {
      res.exists ? this.router.navigate(['../auth/login'], {queryParams: {email: email}}) : this.router.navigate(['../auth/register'], {queryParams: {email: email}})
    })
  }

  submit() {
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
