import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {IssueTypesService} from "../../../../../core/services";
import {IssueTypeEnum} from "../../../../../core/enums";

@Component({
  selector: 'app-issue-type-add-edit',
  templateUrl: './issue-type-add-edit.component.html',
  styleUrls: ['./issue-type-add-edit.component.scss']
})
export class IssueTypeAddEditComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required),
    color: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    issueTypeColumns: new FormArray([], Validators.required),
  })
  issueTypes = Object.values(IssueTypeEnum);

  issueTypeId!: number;

  get columnsFormArray() {
    return this.form.get('issueTypeColumns') as FormArray;
  }

  constructor(
    private readonly issueTypeService: IssueTypesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.issueTypeId = +params['id'];
        this.getBoard()
      }
    })
  }

  getBoard() {
    this.issueTypeService.getIssueTypeByID(this.issueTypeId).subscribe(res => {
      this.form.patchValue(res)
      res.issueTypeColumns.forEach((column: any) => {
        this.columnsFormArray.push(new FormGroup({
          id: new FormControl(column.id),
          name: new FormControl(column.name, Validators.required),
          filedName: new FormControl(column.filedName, Validators.required),
          isRequired: new FormControl(column.isRequired, Validators.required)
        }, Validators.required));
      })
    })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      filedName: new FormControl(null, Validators.required),
      isRequired: new FormControl(false, Validators.required),
    }, Validators.required));
  }


  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.issueTypeId) {
      this.issueTypeService.updateIssueType(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/projects/setting/issue-types']).then()
        })
    } else {
      this.issueTypeService.setIssueType(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/projects/setting/issue-types']).then()
        })
    }


  }

  removeColumn(i: number) {
    this.columnsFormArray.removeAt(i);
  }
}
