import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IColumn} from "../../core/interfaces";
import {Observable, shareReplay, Subject, takeUntil} from "rxjs";
import {IssueTypesService} from "../../core/services";
import {EpicService} from "../../core/services/epic.service";
import {IEpic} from "../../core/interfaces/epic";
import {ProjectService} from "../../core/services/project.service";
import {TaskService} from "../../core/services/task.service";


@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit, OnDestroy{

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    issueTypeId: new FormControl('', Validators.required),
    epicId: new FormControl(''),
    boardId: new FormControl('', Validators.required),
    boardColumnId: new FormControl(''),
    isBacklog: new FormControl(false, Validators.required),
    priority: new FormControl('', Validators.required),
    taskStatus: new FormControl(this.data.column?.taskStatus || 'ToDo', Validators.required),
    assigneeId: new FormControl(''),
    reporterId: new FormControl('', Validators.required),
    taskProperty: new FormArray([]),
  })

  constructor(
    private taskService: TaskService,
    private issueTypeService: IssueTypesService,
    private epicService: EpicService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {taskId: number, boardId: number, column: IColumn}
  ) {
  }

  sub$ = new Subject();
  types$: Observable<any> = this.issueTypeService.getIssueType();
  epics$: Observable<IEpic[]> = this.epicService.getEpics();
  users$: Observable<any> = this.projectService.getProjectUsers()
    .pipe(shareReplay(2));
  priorities: { id: 'LOW' | 'MEDIUM' | 'HIGH', name: string }[] = [
    {id: 'LOW', name: 'Low'},
    {id: 'MEDIUM', name: 'Medium'},
    {id: 'HIGH', name: 'High'},
  ]

  get taskProperty() {
    return this.form.get('taskProperty') as FormArray;
  }



  ngOnInit() {
    //this.getTask(this.data.taskId);
    if (this.data.taskId) {
      this.getTask(this.data.taskId);
    } else {
      this.form.get('issueTypeId')?.valueChanges.pipe(takeUntil(this.sub$))
        .subscribe((issueTypeId: number) => {
          this.getIssueTypeProperties(issueTypeId)
        })
     }
    if (this.data.boardId) {
      this.form.patchValue({boardId: this.data.boardId})
    }
    if (this.data.column) {
      this.form.patchValue({boardColumnId: this.data.column.id})
    }
    console.log(this.types$);
  }

  getIssueTypeProperties(issueTypeId: number) {
    this.issueTypeService.getIssueTypeByID(issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.taskProperty.clear();
        res.issueTypeColumns.forEach((property: any) => {
          this.taskProperty.push(new FormGroup({
            id: new FormControl(null),
            name: new FormControl(property.name),
            filedName: new FormControl(property.filedName),
            value: new FormControl(null, property.isRequired ? Validators.required : null),
            isRequired: new FormControl(property.isRequired),
          }))
        })
      })
  }


  private getTask(taskId: number) {
    this.taskService.getTask(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe((res: any) => {
        this.form.patchValue(res)
        res.taskProperty.forEach((property: any) => {
          this.taskProperty.push(new FormGroup({
            id: new FormControl(property.id),
            name: new FormControl(property.name, Validators.required),
            filedName: new FormControl(property.filedName, Validators.required),
            value: new FormControl(property.value, Validators.required),
            isRequired: new FormControl(property.isRequired, Validators.required),
          }))
        })
      })
  }

  save() {
    console.log(this.form);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    if(this.data.taskId) {
      this.taskService.updateTask(this.data.taskId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
        this.dialogRef.close(res);
      })
    } else {
      this.taskService.createTask(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
