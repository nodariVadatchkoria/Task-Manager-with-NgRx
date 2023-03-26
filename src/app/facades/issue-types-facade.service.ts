import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {IssueTypesService} from "../core/services";
import {IssueType} from "../core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class IssueTypesFacadeService {

  constructor(
    private issueTypeService: IssueTypesService
  ) {
  }

  setIssueType(issueType: IssueType) {
    this.issueTypeService.setIssueType(issueType)
  }

  getIssueType(): Observable<any> {
   return  this.issueTypeService.getIssueType();
  }

  getIssueTypeByID(id: number): Observable<any> {
    return this.issueTypeService.getIssueTypeByID(id)
  }

  updateIssueType(id: number, issueType: IssueType): Observable<any> {
    return this.issueTypeService.updateIssueType(id, issueType);
  }

  deleteIssueType(id: number): Observable<any> {
    return this.issueTypeService.deleteIssueType(id);
  }
}
