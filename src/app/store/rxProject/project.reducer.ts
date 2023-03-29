import {createReducer, on} from "@ngrx/store";
import {
    initCurrentProject,
    loadProjects,
    loadProjectsFailure,
    loadProjectsSuccess,
    setProject,
    setProjectFailure,
    setProjectSuccess
} from "./project.actions";
import {IProject} from "../../core/interfaces/iproject";

export interface ProjectStateModule {
    projects: IProject[];
    currentProject: IProject | null;
    error: any;
}
const initialState : ProjectStateModule = {
    projects: [],
    currentProject: null,
    error: null
};
export const projectReducer = createReducer(
    initialState,
    on(loadProjects, state => state),
    on(loadProjectsSuccess, (state, action) => {
        return {
            ...state,
            projects: action.data
        };
    }
    ),
    on(loadProjectsFailure, (state, action) => state),
    on(setProject, (state, action) => {
        const project = state.projects.find((project) => project.id === +action.projectId);
        project && localStorage.setItem('project', JSON.stringify(project));
        return {
            ...state,
            currentProject: project || null
        };
    }),
    on(setProjectSuccess, (state, action) => {

        // const project = state.projects.find((project: IProject) => project.id === action.projectId);
        // project & localStorage.setItem('project', JSON.stringify(project));
        return {
            ...state,
            currentProject: action.data || null
        };
        }
    ),
    on(setProjectFailure, (state, action) => state),
    on (initCurrentProject, (state) => {
        const project = localStorage.getItem('project');
        return {
            ...state,
            currentProject: project ? JSON.parse(project) : null
        };
    })
);