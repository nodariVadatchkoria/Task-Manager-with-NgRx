import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { StepperNextService } from 'src/app/core/services/stepper.next.service';



// import { ProjectFacade } from 'src/app/facades/project-facade.service';
import { ControlProjectsService } from 'src/app/core/services/control-projects.service';
import { tap} from 'rxjs';
import {ValidCounterService} from "../../../core/services/valid-counter.service";
import {Store} from "@ngrx/store";
import {ProjectStateModule, setProject} from "../../../store";
import {IProject} from "../../../core/interfaces/iproject";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit, AfterViewInit {
  constructor(
    private _formBuilder: FormBuilder,
    private stepperService: StepperNextService,
    private controlProjectsService: ControlProjectsService,
    // private projectFacade: ProjectFacade,
    private validCounter: ValidCounterService,
    private store: Store<{ project: ProjectStateModule }>,
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.projectComponent(0);
  }

  projectComponent(index: number) {
    this.validCounter.validCounter(this.projectFormGroup, index);
  }

  projectFormGroup = this._formBuilder.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    abbreviation: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(4)]],
    color: ['#910D9B', Validators.required],
  });
  isEditable = true;
  projectId!: number;

  onSubmit() {
    this.stepperService.changeFromLinear();

    this.stepperService.openNextStep(1);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 500);

    console.log(this.projectFormGroup.value);
    this.controlProjectsService
      .addProject(this.projectFormGroup.value)
      .pipe(
        tap((res:IProject) => {
          // this.projectFacade.setProject(res);
          this.store.dispatch(setProject({projectId: res.id}))
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
    if (this.projectFormGroup.valid) {
      this.stepperService.complete.next(true);
    }
    this.stepperService.complete.next(false);
  }
}
