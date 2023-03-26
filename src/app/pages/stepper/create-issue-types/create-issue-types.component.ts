import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {from, map, Observable, startWith, filter, of, timeout, toArray} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {StepperNextService} from 'src/app/core/services/stepper.next.service';

import { IssueTypesService } from 'src/app/core/services';
import {ValidCounterService} from "../../../core/services/valid-counter.service";

@Component({
  selector: 'app-create-issue-types',
  templateUrl: './create-issue-types.component.html',
  styleUrls: ['./create-issue-types.component.scss'],
})
export class CreateIssueTypesComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private stepperService: StepperNextService,
    private issueTypesService: IssueTypesService,
    private validCounter: ValidCounterService
  ) {
  }

  issueFormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    icon: ['', Validators.required],
    color: ['#910D9B', Validators.required],
    status: ['', Validators.required],
    tasks: [[] as string[], Validators.required],
    columns: this._formBuilder.array([]),
  });
  isEditable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  taskControl = new FormControl();
  filteredTasks!: Observable<string[]>;
  tasks: string[] = [];
  allTasks: string[] = ['Task', 'Bug', 'Test', 'Spike'];

  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.filteredTasks = this.taskControl.valueChanges.pipe(
      startWith(null),
      map((task: any) => (task ? this.filter(task) : this.allTasks.slice()))
    );

  }



  ngAfterViewInit() {
    this.issueFormGroup.get('name')?.setValue('ss');
    this.issueComponent(2);
    this.issueFormGroup.get('name')?.setValue('');
  }

  issueComponent(index: number) {
    this.validCounter.validCounter(this.issueFormGroup, index);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tasks.push(value);
    }

    event.chipInput!.clear();
    this.taskControl.setValue(null);
  }

  remove(role: string): void {
    const index = this.tasks.indexOf(role);

    this.taskInput.nativeElement.select();

    if (index >= 0) {
      this.tasks.splice(index, 1);
      this.issueFormGroup.get('tasks')!.setValue(this.tasks)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tasks.push(event.option.viewValue);
    this.taskInput.nativeElement.value = '';
    this.taskControl.setValue(null);
  }

  filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.allTasks.filter((task) =>
      task.toLowerCase().includes(filterValue)
    );
  }

  // Adding Issue Type
  get colsArray() {
    return <FormArray>this.issueFormGroup.get('columns');
  }

  addCol() {
    this.colsArray.push(
      new FormGroup(
        {
          name: new FormControl('', Validators.required),
          filedName: new FormControl('', Validators.required),
          isRequired: new FormControl('', Validators.required),
        },
        Validators.required
      )
    );
  }

  onSubmit() {
    this.stepperService.changeFromLinear();

    this.stepperService.openNextStep(3);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 1000);

    this.issueTypesService.setIssueType(this.issueFormGroup.value).subscribe({
      next: (res) => console.log(res),
    });
  }

  goBack() {
    this.stepperService.changeFromLinear();
    this.stepperService.openNextStep(1);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 500);
    if (this.issueFormGroup.valid) {
      this.stepperService.complete.next(true);
    }
    this.stepperService.complete.next(false);
  }

  filterOptions() {
    setTimeout(() => {
      const tasks: any = this.issueFormGroup.get('tasks')!.value;

      const newFilteredTasks = this.allTasks.filter(task => {
        return !tasks.includes(task)
      });

      this.filteredTasks = of(newFilteredTasks);
    }, 200)
  }
}
