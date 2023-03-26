import { Injectable } from '@angular/core';
import {ProjectService} from "../core/services/project.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IProject} from "../core/interfaces/iproject";
import {PaginationResponse} from "../core/interfaces/pagination-response";

@Injectable({ providedIn: 'root' })
export class ProjectFacade {

  myProjects: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
  myProjects$ = this.myProjects.asObservable();

  constructor(private projectService: ProjectService ) {}

  setProject(project: any) {
    if (project) {
      localStorage.setItem('project', JSON.stringify(project))
    }
  }
getMyProjects$(): Observable<IProject[]>{
    return this.projectService.getAllProjects()
      .pipe(
        tap(projects => this.myProjects.next(projects)),
      )
  }
  getProject():IProject {
    const project = localStorage.getItem('project');

    return project ? JSON.parse(project) : null;
  }
  setProjectId(projectId: any) {
    this.projectService.getProjectById(projectId).subscribe((project) => {
      localStorage.setItem('project', JSON.stringify(project));
    }
    )
  }
getProjectId(): number {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project).id : null;
  }

}
