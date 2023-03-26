import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {ProjectFacade} from "../../../facades/project-facade.service";
import {ProjectService} from "../../../core/services/project.service";

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<boolean> {

  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(route)

    const projectId: string = route.params['id'];

    return this.projectService.getById(projectId)
      .pipe(
        map(res => {
            this.projectService.projectName = res.name;
            this.projectFacade.setProject(res)
            return res;
          }
        )
      );
  }
}
