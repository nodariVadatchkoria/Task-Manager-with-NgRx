import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {User} from "../../../../core/interfaces";
import {UsersService} from "../../../../core/services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../../../../shared/confirm-delete/confirm-delete.component";
import {PageEvent} from "@angular/material/paginator";
import {UserRoleComponent} from "../user-role/user-role.component";
import {UserAddEditComponent} from "../user-add-edit/user-add-edit.component";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<User>();

  sub$ = new Subject();
  pageIndex  = 1;
  total = 0;
  pageSize = 10;

  constructor(
    private userService: UsersService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(users => {
        this.dataSource.data = users.data;

        this.total = users.totalCount;
      });
  }


  addUser(id?: number) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    })

  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.userService.deleteUserById(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getUsers();
        }
      });
  }

  pageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getUsers()
  }

  setRole(user: User) {
    const dialogRef = this.dialog.open(UserRoleComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    })
  }
}

