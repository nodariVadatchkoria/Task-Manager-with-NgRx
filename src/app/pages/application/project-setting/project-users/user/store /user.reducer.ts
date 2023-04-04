import {createReducer, on} from "@ngrx/store";
import {User} from "../../../../../../core/interfaces";
import {loadUsersSuccess} from "./user.actions";

export interface UserStateModel {
    users: User[];
    page: number;
    limit: number;
    totalCount: number;

}

const initialState = {
    users: [],
    page: 1,
    limit: 10,
}


export const userReducer = createReducer(
    initialState,
    on(loadUsersSuccess, (state, {data}) => {
        return {
            ...state,
            users: data.data,
            limit: data.limit,
            page: data.page,
            totalCount: data.totalCount,
        }
    })
);