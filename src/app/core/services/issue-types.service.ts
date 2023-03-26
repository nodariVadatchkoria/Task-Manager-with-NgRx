import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IssueType } from '../interfaces';
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root',
})
export class IssueTypesService extends BaseService {
  // apiUrl = environment.apiUrl + 'issue-type';

  // constructor(private http: HttpClient) {}

  setIssueType(issueType: any): Observable<IssueType> {
    localStorage.setItem('issueType', JSON.stringify(issueType));
    return this.http.post<IssueType>('issue-type', issueType);
  }

  getIssueType(): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type');
  }
  getIssueTypes(): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type');
  }

  getIssueTypeByID(id: number): Observable<IssueType> {
    return this.get<IssueType>(`issue-type/${id}`); //`${this.apiUrl}/${id}`
  }
  getIssueTypesByID(id: number): Observable<IssueType> {
    return this.get<IssueType>(`issue-type/${id}`); //`${this.apiUrl}/${id}`
  }
  // updateIssueType(id: number, issueType: IssueType): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, issueType);
  // }

  updateIssueType(data: any): Observable<IssueType> {
    return this.put<IssueType>(`issue-type/${data.id}`, data);
  }

  deleteIssueType(id: number): Observable<any> {
    return this.delete(`issue-type/${id}`);
  }
}
