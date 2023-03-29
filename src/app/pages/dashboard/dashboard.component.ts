import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {IProject} from "../../core/interfaces/iproject";
import {ProjectService} from "../../core/services/project.service";
import {ProjectFacade} from "../../facades/project-facade.service";
import {BoardService} from "../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  scrolledTop: boolean = false;
  scrolled: boolean = true;

  projects: any = [];
  projects$: Observable<IProject[]> = this.projectService.getAllProjects();
  currentProject?: IProject | undefined = this.projectFacade.getProject()
  sub$ = new Subject()
  boards$ = this.boardService.getBoardss()
  boardId:number| null = null;
  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
    private boardService: BoardService,
    private route: ActivatedRoute,
  ) {
  }

  @ViewChild('project') project!: ElementRef;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id']
      } else {
        this.boardId = null
      }
    })
    this.getMyProjects()
  }
  getMyProjects() {
    this.projectFacade.getMyProjects$()
      .pipe(takeUntil(this.sub$))
      .subscribe()
  }
  ngAfterViewInit() {
    this.project.nativeElement.addEventListener('scroll', () => {
      let firstElPos = this.project.nativeElement.firstChild.getBoundingClientRect().top;
      firstElPos <= -10 ? this.scrolled = true : this.scrolled = false;
      firstElPos <= -window.innerHeight ? this.scrolledTop = true : this.scrolledTop = false;
    })
  }

  selectedProject(projectId: any) {
    this.projectFacade.setProjectId(projectId)
    setTimeout(() => {
      location.reload()
    }, 6000)
  }

}
