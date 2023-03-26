import {Component, OnInit} from "@angular/core";
import {ControlProjectsService} from "../../../../core/services/control-projects.service";
import {BoardService} from "../../../../core/services/board.service";
import {Router} from "@angular/router";
import {IProject} from "../../../../core/interfaces/iproject";
import {PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../../core/services/shared.service";
import {ProjectFacade} from "../../../../facades/project-facade.service";

import {DescriptionComponent} from "./description.component";


@Component({
  selector: 'app-project-info',
  templateUrl: 'project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})

export class ProjectInfoComponent implements OnInit {

  constructor(private projectsService: ControlProjectsService,
              private boardService: BoardService,
              private sharedService: SharedService,
              private router: Router,
              private projectFacade: ProjectFacade,

  ) {
  }

  projects: IProject[] = [];
  projectsLength: number = 0;
  pageSize: number = 10;
  page: number = 1;

  /*  @Input('length') length!: number;
    @Input('pageSize') pageSize!: number;
    @Input('pageSizeOptions') pageSizeOptions!: number;*/
get project(): IProject {
  return this.projectFacade.getProject();

}
  ngOnInit() {
    this.getProjects('DESC', this.page, this.pageSize);

    this.projectsService.getAllProjects()
      .subscribe(res => {
        this.projectsLength = res.length;

      })
  }

  getProjects(order: string, page: number, pageSize: number) {
    this.projectsService.getProjects(order, page, pageSize).subscribe({
      next: res => res.data.forEach((project: any) => {

        this.projects.push(project);
      }),
      error: err => console.log(err),
    })
  }


  settingsChanged(event: PageEvent) {
    console.log(event)
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.projects = [];
    this.getProjects('DESC', this.page, this.pageSize);
  }


}
