import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/iproject";
import {ProjectFacade} from "../../../facades/project-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ControlProjectsService} from "../../../core/services/control-projects.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {
  disabled: boolean = true;
  touchUi: boolean = false;
  colorCtr: any;
  color: any;
  projects$ = this.projectFacade.myProjects$;
  sub$ = new Subject()
  projectId!: number;

  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
    private controlProjectsService: ControlProjectsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl('null', ),
    name: new FormControl('null', ),
    description: new FormControl('null', ),
    abbreviation: new FormControl('null', ),
    color: new FormControl('null', ),
  });
  project: IProject = {} as IProject;
  currentProjectId: number = this.projectFacade.getProjectId();
  currentProj = this.projectService.getProjectById(this.currentProjectId)
    .pipe(takeUntil(this.sub$))
    .subscribe((res) => {
      this.project = res;
      this.form.patchValue(this.project)

    })

  get currentProject(): IProject {
    return this.projectFacade.getProject();
  }

  delete() {
  this.projectService.deleteProject(this.currentProjectId)
    .pipe(takeUntil(this.sub$))
    .subscribe((res) => {
    localStorage.removeItem('project');
  });
    setTimeout(() => {
      location.reload()
    }, 2000)
  }

  ngOnInit(): void {
    this.project = JSON.parse(localStorage.getItem('project')!);
    this.form.patchValue(this.project)

    this.route.params.subscribe(
      params =>{
        if (params['id']){
          this.projectService.getProjectById(+params['id'])
            .pipe(takeUntil(this.sub$))
            .subscribe(
              res =>{
                this.form.patchValue(res)
              }
            )
        }
      }
    )
  }


  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return
    }
    this.projectService.updateProject(this.currentProjectId, this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        localStorage.setItem('project', JSON.stringify(res));
        setTimeout(() => {
          this.router.navigate(['/application/setting/info']).then()
        }, 2000)

      })
  }
}

