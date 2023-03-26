import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskStatusEnum} from "../../../../../core/enums/task-status.enum";
import {BoardService} from "../../../../../core/services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent implements OnInit {
  boardId!: number;
  taskStatuses = Object.values(TaskStatusEnum);
 constructor(
   private boardService: BoardService,
   private router: Router,
   private route: ActivatedRoute,

 ) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    if (params['id']) {
      this.boardId = +params['id'];
      this.getBoard()
    }
  })
}
getBoard() {
  this.boardService.getBoardId(this.boardId).subscribe(res => {
    this.form.patchValue(res)
    res.columns.forEach(column => {
      this.columnsArray.push(new FormGroup({
        id: new FormControl(column.id),
        name: new FormControl(column.name, Validators.required),
        description: new FormControl(column.description, Validators.required),
        position: new FormControl(column.position, Validators.required),
        taskStatus: new FormControl(column.taskStatus, Validators.required)
      }, Validators.required));
    })
  })
}


  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  });



  get columnsArray(): FormArray {
    return this.form.get('columns') as FormArray;
  }
  addColumn() {
    this.columnsArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsArray.length + 1, Validators.required),
      taskStatus: new FormControl(TaskStatusEnum.ToDo, Validators.required),
    },Validators.required));

  }


  save() {
this.form.markAllAsTouched();
if (this.form.invalid) {
  return;
}
this.boardService.addBoard(this.form.value).subscribe(
  res =>{
    this.router.navigate(['/application/setting/board']);
  }
);
  }

  drop($event: CdkDragDrop<any, any>) {
    moveItemInArray(this.columnsArray.controls, $event.previousIndex, $event.currentIndex);
    console.log(this.columnsArray.controls);
    this.columnsArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1);
    })

  }
}
