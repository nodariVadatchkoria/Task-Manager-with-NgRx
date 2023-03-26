import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectSettingComponent} from "./project-setting.component";
import {ProjectBoardComponent} from "./project-board/project-board.component";
import {ProjectIssueTypesComponent} from "./project-issue-type/project-issue-types.component";
import {ProjectUsersComponent} from "./project-users/project-users.component";
import {ProjectInfoComponent} from "./project-info/project-info.component";
import {ProjectEditComponent} from "../project-edit/project-edit.component";
import {DescriptionComponent} from "./project-info/description.component";
import {BoardEditComponent} from "./project-board/board-edit/board-edit.component";
import {UserEditComponent} from "./project-users/user/user-add-edit/user-edit.component";
import {IssueTypesComponent} from "../../project/project-setting/containers/issue-types/issue-types.component";
import {IssueTypesAddEditComponent} from "./project-issue-type/issue-type-add-edit/issue-types-add-edit.component";
import {ProjectEpicsComponent} from "./project-epic/project-epics.component";
import {EpicAddEditComponent} from "./project-epic/epic-add-edit.component";


const routes: Routes = [
  {
    path: '',
    component: ProjectSettingComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        children:
      [
        {
          path: '',
          component: ProjectInfoComponent
        },
        {
          path: 'description/:id',
          component: DescriptionComponent
        },
      ]
      },

      {
        path: 'board',
        children: [
          {
            path: '',
            component: ProjectBoardComponent
          },
          {
            path: 'addBoard',
            component: BoardEditComponent
          },
          {
            path: 'editBoard/:id',
            component: BoardEditComponent
          }
        ]

      },
      {
        path: 'issueType',
        component: ProjectIssueTypesComponent
      },
      {
        path: 'edit/:id',
        component: ProjectEditComponent
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: ProjectUsersComponent
          },
          {
            path: 'edit/:id',
            component: UserEditComponent,
          },
        ]

      },
      {
        path: 'issue-types',
        children: [
          {
            path: '',
            component: IssueTypesComponent
          },
          {
            path: 'add',
            component: IssueTypesAddEditComponent
          },
          {
            path: 'edit/:id',
            component: IssueTypesAddEditComponent
          }
        ]
      },
      {
        path: 'epics',
        children: [
          {
            path: '',
            component: ProjectEpicsComponent
          },
          {
            path: 'add',
            component: EpicAddEditComponent
          },
          {
            path: 'edit/:id',
            component: EpicAddEditComponent
          }
        ]
      }


    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSettingRoutingModule {
}
