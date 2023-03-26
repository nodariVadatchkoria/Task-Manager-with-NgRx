import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectFacadeService extends BaseService {
  createProject(payload: any): Observable<any> {
    return this.post<any>('project', payload);
  }
  getProjects(): Observable<any> {
    return this.get<any>('project');
  }
}
