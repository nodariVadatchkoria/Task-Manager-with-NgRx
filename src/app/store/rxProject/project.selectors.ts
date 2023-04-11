import {createSelector} from "@ngrx/store";
import {IProject} from "../../core/interfaces/iproject";

export const currentProject = createSelector(
    (state: any) => state.project.currentProject,
    (currentProject) => currentProject
)
export const getProject = createSelector(
    (state: any) => state.project.projects,
    (projects: IProject[], props: { projectId: number}) => projects.find((project) => project.id === +props.projectId)
)

export const projectUsers = createSelector(
    (state: any) => state.project.projectUsers,
    (projectUsers) => projectUsers
)