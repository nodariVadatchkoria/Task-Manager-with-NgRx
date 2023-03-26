import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {HttpHeaders} from "@angular/common/http";

import {IBoard} from "../interfaces/board";

@Injectable({ providedIn: 'root' })
export class BoardService extends BaseService {

  addBoard(payload: any): Observable<any> {
    localStorage.setItem('board', JSON.stringify(payload));
    return this.post<any>('board', payload);
  }

  getBoards(header: any): Observable<any> {
    return this.get<any>('board')
  }

  getBoardByID(boardId: number, projectId: string): Observable<any> {
    return this.get<any>(`board/${boardId}`, {headers: {project: projectId}})
  }
  getBoardss(): Observable<IBoard[]> {
    return this.get<IBoard[]>('board');
  }
  getBoardId(id: number): Observable<IBoard> {
    return this.get<IBoard>(`board/${id}`);
  }
  updateBoard(data: any): Observable<IBoard> {
    return this.put(`board/${data.id}`, data);
  }

  getProjBoards(): Observable<IBoard[]> {
    return this.get<IBoard[]>('board');
  }
  deleteBoard(id: number): Observable<any> {
    return this.delete(`board/${id}`);
  }

}
