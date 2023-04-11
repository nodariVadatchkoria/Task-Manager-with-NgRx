import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../../core/services/users.service";
import {loadUsers, loadUsersSuccess, loadUsersFailure} from "./user.actions";
import {catchError, map, of, switchMap} from "rxjs";


@Injectable()

export class UserEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
    ) {}

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() => this.usersService.getUsers({
            page: 1,
            limit: 10,

})),
        map((data) => loadUsersSuccess({data} )),

        catchError((err) => of(loadUsersFailure({error: err})))
    ));

}