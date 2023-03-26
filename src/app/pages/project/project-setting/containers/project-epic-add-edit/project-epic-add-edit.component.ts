import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {EpicService} from "../../../../../core/services/epic.service";

@Component({
  selector: 'app-project-epic-add-edit',
  templateUrl: './project-epic-add-edit.component.html',
  styleUrls: ['./project-epic-add-edit.component.scss']
})
export class ProjectEpicAddEditComponent implements OnInit, OnDestroy{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private epicService: EpicService
  ) {
  }

  sub$ = new Subject();

  epicId!: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.epicId = +params['id'];
        this.getEpic(this.epicId);
      }
    })
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.epicId) {
      this.epicService.updateEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.router.navigate(['/projects/setting/epics']).then()
        })
    } else {
      this.epicService.createEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.router.navigate(['/projects/setting/epics']).then()
        })
    }

  }

  private getEpic(id: number) {
    this.epicService.getEpic(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.form.patchValue(res)
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
