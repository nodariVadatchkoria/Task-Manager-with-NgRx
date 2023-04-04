import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/iproject";
import {ProjectFacade} from "../../../facades/project-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ControlProjectsService} from "../../../core/services/control-projects.service";
import {Observable, pipe, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {loadProjects, ProjectStateModule} from "../../../store";
import {stringify} from "postcss";
import {values} from "lodash";
import {MatSnackBar} from "@angular/material/snack-bar";
import {data} from "autoprefixer";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {
  disabled: boolean = true;
  touchUi: boolean = false;
  colorCtr: any;

  projects$ = this.projectFacade.myProjects$;
  sub$ = new Subject()
  projectId!: number;

  constructor(
      private store: Store<{ project: ProjectStateModule }>,
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
    private controlProjectsService: ControlProjectsService,
    private router: Router,
    private route: ActivatedRoute,
      private _snackBar: MatSnackBar,
  ) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl('null', ),
    name: new FormControl('null', ),
    description: new FormControl('null', ),
    abbreviation: new FormControl('null', ),
    color: new FormControl('null',),
  });
  color: any;
  project: IProject = {} as IProject;
  // currentProjectId: number = this.projectFacade.getProjectId();
  currentProjectId$: any= tap(() => {
    this.store.dispatch(loadProjects())
  })
  currentProj = this.projectService.getProjectById(this.currentProjectId$)
    .pipe(takeUntil(this.sub$))
    .subscribe((res) => {
      this.project = res;
      this.form.patchValue(this.project)

    })

  get currentProject(): any{
    // return this.projectFacade.getProject();
    return this.store.dispatch(loadProjects())
  }

  delete() {
  this.projectService.deleteProject(this.currentProjectId$)
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
          this.projectId = +params['id'];
          this.projectService.getProjectById(+params['id'])
            .pipe(takeUntil(this.sub$))
            .subscribe(
              res =>{
                this.form.patchValue(res)
                console.log(res)
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
    // if(this.projectId){
    //   this.projectService.updateProject(this.projectId, this.form.value)
    //       .pipe(takeUntil(this.sub$),
    //           tap((res)=>this.projectFacade.setProject(res.id)),
    //           switchMap((res)=>this.projectFacade.getMyProjects$())
    //       ).subscribe(
    //         res => {
    //
    //           this.router.navigate(['/application/setting/info']).then();
    //         })
    //   return;
    //
    // }
    this.projectService.updateProject(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        localStorage.setItem('project', JSON.stringify(res));
        setTimeout(() => {
          this._snackBar.open('Project updated', 'Close', {
            duration: 2000,
          }
          )
          this.router.navigate(['/application/setting/info']).then()


        }, 2000)
        setTimeout(() => {
          location.reload()
        },4000)

      })
  }
}

