import { Injectable } from '@angular/core';
import { User, UsersRoles } from '../interfaces';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {PaginationResponse} from "../interfaces/pagination-response";

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  // apiUrl = environment.apiUrl + 'users';

  // constructor(
  //   // private http: HttpClient
  // ) {}
createUser(user: User){
    return this.post('users', user)
  }

  // getUsers(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  getUsers(params = {}): Observable<PaginationResponse<User>> {
    return this.get('users', params);
  }

  getUsersAll(): Observable<any> {
    return this.http.get(this.apiUrl + 'users' + '/all');
  }

  getUserByID(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  setUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  setUserRoles(userRole: UsersRoles) {
    return this.http.post(this.apiUrl, userRole);
  }

  updateUserById(id: number, user: User) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUserById(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateUserRoles(params: { userId: number, roleIds: number[] }): Observable<User> {
    return this.post(`users/roles`, params);
  }
}
