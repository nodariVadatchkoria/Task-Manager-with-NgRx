import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  http: HttpClient = inject(HttpClient);
  apiUrl = environment.apiUrl


  post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body)
  }

  // get<T>(url: string, params?: any): Observable<T> {
  //   return this.http.get<T>(this.apiUrl + url,
  //     {params: new HttpParams({fromObject: params})})
  // }



  get<T>(url: string, params = {}): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, {
      params: params
      })
  }


  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url)
  }

  put<T>(url: string, body?: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, body)
  }
}
