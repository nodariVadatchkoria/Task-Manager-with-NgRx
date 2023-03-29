import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectService} from "../../core/services/project.service";
import {
    initCurrentProject, loadProjects, loadProjectsFailure, loadProjectsSuccess, setProject,
    setProjectSuccess
} from "./project.actions";
import {catchError, of, switchMap, map} from "rxjs";
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "./project.reducer";
import {state} from "@angular/animations";
import {tap} from "lodash";
import {IProject} from "../../core/interfaces/iproject";


@Injectable()
export class ProjectEffects{
    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private store: Store,
    ) {
    }

    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(loadProjects),
        switchMap(() => this.projectService.getMyProjects().pipe(
            map((data) => loadProjectsSuccess({data})),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    setProject$ = createEffect(() => this.actions$.pipe(
        ofType(setProject),
        switchMap((action) => this.projectService.getProjectById(action.projectId).pipe(
            map((data) => setProjectSuccess({data})),
            catchError((error) => of(loadProjectsFailure({error})))
        ))
    ))

    setProjectSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(setProjectSuccess),
    map((action) => {
        localStorage.setItem('project', JSON.stringify(action.data));
    })
    ), {dispatch: false});

    // initCurrentProject$ = createEffect(() => this.actions$.pipe(
    //     ofType(initCurrentProject),
    //     map(() => {
    //         const project = localStorage.getItem('project');
    //         return  project ? JSON.parse(project) : null;
    //     })
    // ));



    // createProject$ = createEffect(() => this.actions$.pipe(
    //     ofType(createProject),
    //     switchMap((action) => this.projectService.createProject(action.project).pipe(
    //         tap((res: IProject) => loadProjects()),
    //         map((res: IProject) => {
    //             this._snackBar.open('Project created', 'Close', {
    //                 duration: 2000,
    //             })
    //
    //             this.router.navigate(['/application/setting']).then();
    //             return setProject({projectId: res.id})
    //         }),
    //         catchError((error) => of(loadProjectsFailure({error})))
    //     ))
    // ))



}
