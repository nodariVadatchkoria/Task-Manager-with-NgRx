import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {IColumn, IBoard} from "../../../core/interfaces";
import {ITask} from "../../../core/interfaces/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../core/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import * as _ from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
boardId!: number;
board!: IBoard;
  tasks: any = {
   // 25: [
   //    {
   //      id: 1,
   //      title: 'Task 1',
   //    },
   //    {
   //      id: 2,
   //      title: 'Task 2',
   //    }
   //  ],
   //  26: [],
   //  27: []
  };
  constructor(
    private boardService: BoardService,
    private router: ActivatedRoute,
    private taskService: TaskService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if(params['id']) {
        this.boardId = +params['id']
        this.getBoard()

      }
    })
  }

  getBoard() {
    this.boardService.getBoardId(this.boardId).subscribe(board =>{
     console.log(board);
      this.board = board;
      this.getTasks()
    })
  }
  private getTasks() {
    this.taskService.getTasks({boardId: this.boardId}).subscribe(tasks => {
      this.tasks = _.groupBy(tasks, 'boardColumnId')
    })
  }

  drop(event: CdkDragDrop<any>, column: IColumn) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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

  addTask(id: number) {


  }
}
