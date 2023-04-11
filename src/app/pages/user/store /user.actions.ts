import {createAction, props} from "@ngrx/store";

export const loadUsers = createAction(
    '[User] Load Users',
    props<{
        page: number,
        limit: number,
    }>()
);

export const loadUsersSuccess = createAction(
    '[user] Load Users Success',
    props<{data: any }>()
);
export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: any }>()
);
