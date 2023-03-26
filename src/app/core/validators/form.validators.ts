import {FormGroup, ValidatorFn} from "@angular/forms";

export const checkPasswordValidator: ValidatorFn | any = (control: FormGroup): any => {
   const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'notSame': true }
}
