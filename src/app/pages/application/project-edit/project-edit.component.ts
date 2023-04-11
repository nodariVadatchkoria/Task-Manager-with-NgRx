import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/iproject";
import {ActivatedRoute, Router} from "@angular/router";
import {ControlProjectsService} from "../../../core/services/control-projects.service";
import {Observable, of, pipe, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {createProject, loadProjects, ProjectStateModule, setProject, updateProject} from "../../../store";

import {MatSnackBar} from "@angular/material/snack-bar";

import {getProject} from "../../../store/rxProject/project.selectors";

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {



    sub$ = new Subject()
    projectId!: number;

    constructor(
        private store: Store<{ project: ProjectStateModule }>,
        private projectService: ProjectService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }



    form: FormGroup = new FormGroup({
        id: new FormControl( 'null',),
        name: new FormControl('null',),
        description: new FormControl('null',),
        abbreviation: new FormControl('null',),
        color: new FormControl('null',),
    });
    // color: any;
    // project: IProject = {} as IProject;

    // currentProjectId$: any = tap(() => {
    //     this.store.dispatch(loadProjects())
    // })
    // currentProj = this.projectService.getProjectById(this.currentProjectId$)
    //     .pipe(takeUntil(this.sub$))
    //     .subscribe((res) => {
    //         this.project = res;
    //         this.form.patchValue(this.project)
    //
    //     })

    // get currentProject(): any {
    //     return this.store.dispatch(loadProjects())
    //
    // }

    delete() {
        // this.projectService.deleteProject(this.currentProjectId$)
        //     .pipe(takeUntil(this.sub$))
        //     .subscribe((res) => {
        //         localStorage.removeItem('project');
        //     });
        // setTimeout(() => {
        //     location.reload()
        // }, 2000)
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                takeUntil(this.sub$),
        switchMap((params: any) => {
                if (params['id']) {
                    this.projectId = +params['id'];
                    return this.store.select(getProject, {projectId: +params['id']})
                }
                return of(null);
            }
        )
    ).subscribe(( params: any) => {
            if (params) {
                this.form.patchValue(params)


            }
            return;
        })

    }


    save() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return
        }
        if (this.projectId) {
            this.store.dispatch(updateProject({project: this.form.value}))
            this.router.navigate(['/application/setting/info']).then();
            return
        } else {
            this.store.dispatch(createProject({project: this.form.value}))
        }
    }
    ngOnDestroy(): void {
        this.sub$.next(null);
        this.sub$.complete();
    }


}

