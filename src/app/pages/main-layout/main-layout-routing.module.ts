import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './main-layout.component';
import {BoardsComponent} from "./boards/boards.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BoardComponent} from "./board/board.component";
import {BoardResolver} from "./resolvers/board.resolver";


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: 'boards/:id',
        resolve: {
          projects: BoardResolver
        },
        component: BoardsComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'board/:id',
        component: BoardComponent
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {
}
