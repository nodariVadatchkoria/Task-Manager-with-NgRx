import {FormControl, ValidatorFn} from "@angular/forms";

export const noWhitespaceValidator: ValidatorFn | any = (control: FormControl): any =>  {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
