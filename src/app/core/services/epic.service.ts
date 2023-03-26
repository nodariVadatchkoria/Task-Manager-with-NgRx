import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {IEpic} from "../interfaces/epic";

@Injectable({
  providedIn: 'root'
})
export class EpicService extends BaseService{

  getEpics(): Observable<any> {
    return this.get<any>('epics')
  }

  getEpic(id: number): Observable<any> {
    return this.get<any>(`epics/${id}`);
  }

  createEpic(epic: any): Observable<any> {
    return this.post<any>('epics', epic);
  }

  updateEpic(epic: any): Observable<any> {
    return this.put<any>(`epics/${epic.id}`, epic)
  }

  deleteEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`)
  }

  getProjEpics(): Observable<IEpic[]> {
    return this.get<IEpic[]>('epics')
  }
  getProjEpicById(id: number): Observable<IEpic> {
    return this.get<IEpic>(`epics/${id}`)
  }
  createProjEpic(epic: IEpic): Observable<IEpic> {
    return this.post<IEpic>('epics', epic);
  }
  updateProjEpic(epic: IEpic): Observable<IEpic> {
    return this.put<IEpic>(`epics/${epic.id}`, epic)
  }
  deleteProjEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`)
  }
}
