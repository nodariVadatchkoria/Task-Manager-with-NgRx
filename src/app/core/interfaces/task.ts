import {IssueType} from "./issue-type";
import {IProject} from "./iproject";
import {User} from "./user";
import {IEpic} from "./epic";

export interface ITask {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType?: IssueType;
  epicId: number;
  epic?: IEpic;
  projectId?: number;
  project?: IProject;
  boardId: number;
  board: string;
  boardColumnId: number;
  boardColumn: string;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  createdById: number;
  createdBy: User;
  deletedById: number;
  deletedBy: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  taskProperty: ITaskProperty[];

}

export interface ITaskProperty {
  id: number;
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}
