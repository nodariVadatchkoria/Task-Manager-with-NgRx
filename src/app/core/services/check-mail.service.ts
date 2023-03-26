import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CheckMailService extends BaseService {

  checkMail(email: {email: string}): Observable<any> {
    return this.post<any>('auth/checkEmail', email);
  }
}
