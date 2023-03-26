import {IProject} from "./iproject";
import {ITask} from "./task";
import {TaskStatusEnum, ETaskStatus} from "../enums";




export interface IBoard {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project:IProject;
  columns: IColumn[];
  tasks: ITask;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IColumn {
  id: number;
  name: string;
  description: string;
  position: number;
  taskStatus: ETaskStatus;
  boardId: number;
  board: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


  // export interface Column {
  //   id: number;
  //   name: string;
  //   description: string;
  //   position: number;
  //   boardId: number;
  //   board: string;
  //   tasks: Task[];
  //   taskStatus: TaskStatusEnum;
  //   createdAt: Date;
  //   updatedAt: Date;
  //   deletedAt: Date;
  // }








