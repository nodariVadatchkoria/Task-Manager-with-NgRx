import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BoardService} from "../../../core/services/board.service";
import {ProjectService} from "../../../core/services/project.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskAddEditComponent} from "../../../shared/task-add-edit/task-add-edit.component";
import {IBoard, IColumn} from "../../../core/interfaces";
import {ITask} from "../../../core/interfaces/task";
import {TaskService} from "../../../core/services/task.service";

import * as _ from 'lodash';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ConfirmDeleteComponent} from "../../../shared/confirm-delete/confirm-delete.component";
import {of, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy{
  boardId!: number;
  sub$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialog: MatDialog) {}

  board: IBoard = {} as IBoard;
  tasks: any = {};
  projectName = this.projectService.projectName;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if(params) {
        this.boardId = +params['id'];
        this.boardService.getBoardByID(params['id'], params['projectId']).subscribe(res => {
         this.board = res;
         console.log(this.board);

        })
        console.log(params['id'])

      }
    })
  }

  ngAfterViewInit() {
    this.getTasks();
  }

  // fetchTasks() {
  //   this.taskService.getTasks({boardId: this.boardId})
  //     .subscribe(tasks => {
  //       this.tasks = tasks;
  //     })
  // }

  addTask(column: IColumn) {
  const dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '600px',
      data: {
        boardId: this.boardId,
        column: column,
      }
    })

    dialogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTasks();
      }
    })
  }

private getTasks() {
    this.taskService.getTasks({boardId: this.boardId}).subscribe(tasks => {
      this.tasks =  _.groupBy(tasks, 'boardColumnId');
      console.log(tasks);

    })
}

  drop(event: CdkDragDrop<any>, column: IColumn) {
    console.log(event.container)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tasks: ITask[] = event.container.data.map((task: ITask, index: number) => {
        return {
          ...task,
          taskStatus: column.taskStatus,
          boardColumnId: column.id,
        }
      })

      this.tasks[column.id] = tasks
      const currentTask = tasks[event.currentIndex]
      console.log(currentTask)
      this.taskService.updateTask(currentTask.id, currentTask).subscribe(task => {

        console.log(task)
        this.getTasks()
      })
    }
  }

  deleteTask(id: number) {
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
          this.getTasks();
        }
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}


