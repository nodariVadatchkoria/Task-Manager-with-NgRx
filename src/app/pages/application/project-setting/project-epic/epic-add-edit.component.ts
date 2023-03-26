import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EpicService} from "../../../../core/services/epic.service";

@Component({
  selector: 'app-epic-add-edit',
  templateUrl: './epic-add-edit.component.html',
  styleUrls: ['./epic-add-edit.component.scss']
})
export class EpicAddEditComponent implements OnInit, OnDestroy{
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  sub$ = new Subject();

  epicId!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private epicService: EpicService,
  ) {
  }

  private getEpic(id: number) {
    this.epicService.getEpic(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.form.patchValue(res)
      })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.epicId = +params['id'];
        this.getEpic(this.epicId)
      }
    })
  }
  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }

    if (this.epicId) {
      this.epicService.updateEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.router.navigate(['/application/setting/epics']).then()
        })
    } else {
      this.epicService.createEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.router.navigate(['/application/setting/epics']).then()
        })
    }
  }
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
