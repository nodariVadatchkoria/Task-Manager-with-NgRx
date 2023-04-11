import {createReducer, on} from "@ngrx/store";
import {
    initCurrentProject,
    loadProjects,
    loadProjectsFailure,
    loadProjectsSuccess, loadProjectUsersSuccess,
    setProject,
    setProjectFailure,
    setProjectSuccess
} from "./project.actions";
import {IProject} from "../../core/interfaces/iproject";
import {User} from "../../core/interfaces";

export interface ProjectStateModule {
    projects: IProject[];
    projectUsers: User[];
    currentProject: IProject | null;

}
const initialState : ProjectStateModule = {
    projects: [],
    projectUsers: [],
    currentProject: null
};
export const projectReducer = createReducer(
    initialState,
    on(loadProjects, state => state),
    on(loadProjectsSuccess, (state, action) => {
        return {
            ...state,
            projects: action.projects
        };
    }
    ),
    on(loadProjectsFailure, (state, action) => state),
    // on(setProject, (state, action) => {
    //     const project = state.projects.find((project) => project.id === +action.projectId);
    //     project && localStorage.setItem('project', JSON.stringify(project));
    //     return {
    //         ...state,
    //         currentProject: project || null
    //     };
    // }),
    on(setProjectSuccess, (state, action) => {

        return {
            ...state,
            currentProject: action.project
        };
        }
    ),
    on(initCurrentProject, (state) => {
        const project = localStorage.getItem('project');
        return {
            ...state,
            currentProject: project ? JSON.parse(project) : null
        }
    }),
    on (loadProjectUsersSuccess , (state, action) => {
        return {
            ...state,
            projectUsers: action.users
        }
    })
);