import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectService} from "../../core/services/project.service";
import {
    createProject,
    initCurrentProject,
    loadProjects,
    loadProjectsFailure,
    loadProjectsSuccess,
    loadProjectUsers,
    loadProjectUsersSuccess,
    setProject,
    setProjectSuccess, setProjectUsers,
    updateProject
} from "./project.actions";
import {catchError, of, switchMap, map, tap, mergeMap, exhaustMap} from "rxjs";
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "./project.reducer";
import {state} from "@angular/animations";

import {IProject} from "../../core/interfaces/iproject";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ProjectFacade} from "../../facades/project-facade.service";


@Injectable()
export class ProjectEffects {
    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private store: Store,
        private _snackBar: MatSnackBar,
        private router: Router,
        private projectFacade: ProjectFacade

    ) {
    }

    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(loadProjects),
        mergeMap(() => this.projectService.getMyProjects().pipe(
            map((projects) => loadProjectsSuccess({projects})),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    setProject$ = createEffect(() => this.actions$.pipe(
        ofType(setProject),
        mergeMap((action) => this.projectService.getProjectById(action.projectId).pipe(
            map((res) => setProjectSuccess({project: res})),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))


    setProjectSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(setProjectSuccess),
    map((action) => {
        localStorage.setItem('project', JSON.stringify(action.project));
    })
    ), {dispatch: false});

 createProject$ = createEffect(() => this.actions$.pipe(
        ofType(createProject),
        mergeMap((action) => this.projectService.createProject(action.project).pipe(
            tap((res: IProject) => setProject({projectId: res.id})),
            map((res: IProject) => {
                this._snackBar.open('Project created', 'Close', {
                        duration: 2000,
                    })
                this.router.navigate(['/application/setting/info']).then()


              return  setProject({projectId: res.id})
            }),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    updateProject$ = createEffect(() => this.actions$.pipe(
        ofType(updateProject),
        switchMap((action) => this.projectService.updateProject(action.project).pipe(
            tap((res: IProject) => loadProjects()),
            map((res: IProject) => {
                this._snackBar.open('Project updated', 'Close', {
                    duration: 2000,
                })
                this.router.navigate(['/application/setting/info']).then()


                return  setProject({projectId: res.id})
            }),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    loadProjectUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadProjectUsers),
        exhaustMap((action) => this.projectService.getProjectUsers().pipe(
            map((data) => loadProjectUsersSuccess({users: data})),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    setProjectUsers$ = createEffect(() => this.actions$.pipe(
        ofType(setProjectUsers),
        exhaustMap((action) => this.projectService.addProjectUserData(action).pipe(
            // map((data) => loadProjectUsers()),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))





}
