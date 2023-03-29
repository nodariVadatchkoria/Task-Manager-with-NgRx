import {createAction, props} from '@ngrx/store';

export const loadProjects = createAction(
    '[Project] Load Projects',
);
export const loadProjectsSuccess = createAction(
    '[Project] Load Projects Success',
    props<{ data: any }>()
);
export const loadProjectsFailure = createAction(
    '[Project] Load Projects Failure',
    props<{ error: any }>()
);

export const setProject = createAction(
    '[Project] Set Project',
    props<{ projectId: number }>()
);
export const setProjectSuccess = createAction(
    '[Project] Set Project Success',
    props<{ data: any }>()
);
export const setProjectFailure = createAction(
    '[Project] Set Project Failure',
    props<{ error: any }>()
);
export const initCurrentProject = createAction(
    '[Project] Init Current Project',
);
