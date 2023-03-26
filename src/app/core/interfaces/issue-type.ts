import {IssueTypeColumn} from "./issue-type-column";


export interface IssueType {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  type: string;
  issueTypeColumns: IssueTypeColumn[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


