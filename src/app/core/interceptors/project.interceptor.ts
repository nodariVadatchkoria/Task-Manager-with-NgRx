import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import {first, Observable, switchMap} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {ProjectStateModule} from "../../store";
import {currentProject} from "../../store/rxProject/project.selectors";
import {ProjectFacade} from "../../facades/project-facade.service";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<{ project: ProjectStateModule }>,
        private projectFacade: ProjectFacade,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.store.pipe(
            select(currentProject),
              first(),
                switchMap((project) => {
                        if (project) {

                                request = request.clone({
                                    setHeaders: {
                                        'project': project.id.toString()
                                    }
                                })
                        }
        // const project = this.projectFacade.getProject();
        // if (project) {
        //     request = request.clone({
        //         setHeaders: {
        //             project: String(project.id)
        //         }
        //     })
        // }
        return next.handle(request);

            }
        )
    )
    }
}
