import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {ITask} from "../../core/interfaces/task";
import {TaskService} from "../../core/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskAddEditComponent} from "../../shared/task-add-edit/task-add-edit.component";
import {ConfirmDeleteComponent} from "../../shared/confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'name', 'issueType', 'epic', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<ITask>();

  sub$ = new Subject();

  constructor(
      private taskService: TaskService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
  }
  getIssueTypes() {
    this.taskService.getTasks({
      isBacklog: true
    })
        .pipe(takeUntil(this.sub$))
        .subscribe(boards => {
          this.dataSource.data = boards;
        });
  }
  addBoard() {
    console.log('add board');
  }
  ngOnDestroy(): void {
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed()
        .pipe(
            takeUntil(this.sub$),
            switchMap((result) => {
              if (result) {
                return this.taskService.deleteTask(id);
              }
              return of(null);
            })
        )
        .subscribe(result => {
          if (result) {
            this.getIssueTypes();
          }
        });
  }

  addTask(taskId?: number) {
    const  doalogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        isBacklog: true,
        taskId,
      },
    });

    doalogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getIssueTypes()
      }
    })
  }
}
