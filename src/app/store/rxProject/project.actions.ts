import {createAction, props} from '@ngrx/store';
import {IProject} from "../../core/interfaces/iproject";
import {User} from "../../core/interfaces";

export const loadProjects = createAction(
    '[Project] Load Projects',
);
export const loadProjectsSuccess = createAction(
    '[Project] Load Projects Success',
    props<{ projects: any }>()
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
    props<{ project: IProject }>()
);
export const setProjectFailure = createAction(
    '[Project] Set Project Failure',
    props<{ error: any }>()
);
export const initCurrentProject = createAction(
    '[Project] Init Current Project',
);

export const createProject = createAction(
    '[Project] Create Project',
    props<{ project: any }>()
);
export const updateProject = createAction(
    '[Project] Update Project',
    props<{ project: any }>()
);

export const loadProjectUsers = createAction(
    '[Project] Load User Projects'
)

export const loadProjectUsersSuccess = createAction(
    '[Project] Load User Projects Success',
    props<{users: User[]}>()
)

export const setProjectUsers = createAction(
    '[Project] Set User Projects',
    props<{ projectId: number, userIds: number[] }>()
)
