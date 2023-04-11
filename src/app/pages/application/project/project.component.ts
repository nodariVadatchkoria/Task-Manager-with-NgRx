import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../core/services/project.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {IProject} from "../../../core/interfaces/iproject";
import {Router} from "@angular/router";
import {ProjectFacade} from "../../../facades/project-facade.service";
import {select, Store} from "@ngrx/store";
import {initCurrentProject, loadProjects, ProjectStateModule, setProject} from "../../../store";
import {currentProject} from "../../../store/rxProject/project.selectors";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  projects:any = [];
  projects$ = this.store.select(project => project.project.projects)
  // currentProject?: IProject  = this.projectFacade.getProject()
  currentProject: IProject | null = null
  sub$ = new Subject()

  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
    private store: Store<{project: ProjectStateModule}>,
  ) {
  }

  ngOnInit(): void {
    // this.projectService.getAllProjects()
    // this.getMyProjects()
    this.store.dispatch(loadProjects())
    this.store.dispatch(initCurrentProject())
    this.store.pipe(select(currentProject))
        .subscribe((project) => {
          this.currentProject = project;
        })

  }

  selectedProject(projectId: any) {
    // this.store.dispatch(setProject(projectId))



    this.projectFacade.setProjectId(projectId)
  }

  getMyProjects() {
    this.store.dispatch(loadProjects())
  }

  scrolledTop: boolean = false;
  scrolled: boolean = false;
  @ViewChild('project') project!: ElementRef;

  ngAfterViewInit() {
    this.project.nativeElement.addEventListener('scroll', () => {
      let firstElPos = this.project.nativeElement.firstChild.getBoundingClientRect().top;
      firstElPos <= -10 ? this.scrolled = true : this.scrolled = false;
      firstElPos <= -window.innerHeight ? this.scrolledTop = true : this.scrolledTop = false;
      console.log(firstElPos);
    })
  }

  clearLocalStorage() {
    localStorage.removeItem('project');
    localStorage.removeItem('board');
    localStorage.removeItem('issueType');
  }


}




