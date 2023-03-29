import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../store";
import {currentProject} from "../../store/rxProject/project.selectors";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<{ project: ProjectStateModule }>,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.store.select(currentProject)
            .pipe(
                switchMap((project) => {
                        if (project) {
                            request = request.clone({
                                setHeaders: {
                            project: String(project.id)
                                }
                            })
                        }
                        // const project = this.projectFacade.getProject();
                        //
                        //
                        // if (project) {
                        //     return next.handle(
                        //         request.clone({
                        //             setHeaders: {project: String(project.id)}
                        //         })
                        //     );
                        // }

                        return next.handle(request);
                    }
                )
            )
    };
}
