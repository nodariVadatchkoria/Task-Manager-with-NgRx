import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IBoard, User} from "../../../../core/interfaces";
import {Observable, Subject, takeUntil} from "rxjs";
import {ProjectService} from "../../../../core/services/project.service";
import {ProjectFacade} from "../../../../facades/project-facade.service";
import {UsersFacadeService} from "../../../../facades/users-facade.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../core/services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {UserEditComponent} from "./user/user-add-edit/user-edit.component";
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../../../store";
import {currentProject} from "../../../../store/rxProject/project.selectors";

@Component({
    selector: 'app-project-users',
    templateUrl: './project-users.component.html',
    styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'firstName', 'lastName', 'email', 'isActive', 'actions']
    dataSource = new MatTableDataSource<IBoard>();
    sub$ = new Subject();
    chooseUserActive = false;
    users$: Observable<User[]> = this.userService.getUsersAll()
    projectUsersIds: number[] = [];

    get projectId() {
        return this.projectFacade.getProject().id
    }

    constructor(
        private store: Store<{ project: ProjectStateModule }>,
        private projectService: ProjectService,
        private projectFacade: ProjectFacade,
        private userFacade: UsersFacadeService,
        private userService: UsersService,
        private dialog: MatDialog,
    ) {
    }

    userForm: FormGroup = new FormGroup({
        userId: new FormControl(null, [Validators.required]),
    });

    getCurrentProjectUsers() {
        this.projectService.getProjectUsersId(this.projectId)
            .pipe(takeUntil(this.sub$))
            .subscribe(users => {
                this.projectUsersIds = users.map((user: User) => user.id)
                this.dataSource.data = users
            })
    }


    ngOnInit(): void {
        // this.getCurrentProjectUsers()
        this.store.select(currentProject)
            .subscribe((project)=>{
                if (project){
                    this.getCurrentProjectUsers();
                }
            })
    }

    ngOnDestroy(): void {
        this.sub$.next(null);
        this.sub$.complete();
    }

    removeUser(id: number) {
        const userIds = this.projectUsersIds.filter((userId: number) => userId !== id)
        this.projectService.addProjectUserData({
            projectId: this.projectId,
            userIds
        })
            .pipe(takeUntil(this.sub$))
            .subscribe(() => {
                this.getCurrentProjectUsers()
            })
    }


    addUser() {
        this.chooseUserActive = !this.chooseUserActive;

    }

    onSubmit() {
        const userIds = [...this.projectUsersIds, this.userForm.value.userId]
        this.createUser(userIds)
            .subscribe(() => {
                this.getCurrentProjectUsers()
                this.addUser()
            })
    }

    createUser(userIds: number[]) {
        return this.projectService.addProjectUserData({
            projectId: this.projectId,
            userIds
        })
            .pipe(takeUntil(this.sub$))

    }

    addNewUser() {
        const dialog = this.dialog.open(UserEditComponent)
        dialog.afterClosed()
            .pipe(takeUntil(this.sub$))
            .subscribe((result: User) => {

                if (result) {
                    const userIds = [...this.projectUsersIds, result.id]
                    this.createUser(userIds)
                        .subscribe(() => {
                            this.getCurrentProjectUsers()
                            this.chooseUserActive = false;
                        })
                }

            })
    }
}
