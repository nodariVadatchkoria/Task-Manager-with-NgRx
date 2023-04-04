import {Component, Injectable} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../../core/services/users.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent {

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
   private usersService: UsersService,
  ) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null,),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    identityNumber: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    isActive: new FormControl(true, ),
  });

  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    this.usersService.createUser(this.form.value)
      .subscribe((res) => {
        this.dialogRef.close(res)
      })
  }


}
