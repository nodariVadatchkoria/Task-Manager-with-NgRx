import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {StepperNextService} from 'src/app/core/services/stepper.next.service';
import {from, Observable, of, timeout} from 'rxjs';
import {DOCUMENT} from "@angular/common";
import {stepper, src} from "../../shared";
import {CreateBoardComponent} from "./create-board/create-board.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {CreateIssueTypesComponent} from "./create-issue-types/create-issue-types.component";
import {AddUsersComponent} from "./add-users/add-users.component";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  isEditable = true;

  nextStepOpen$: Observable<number> = this.stepperService.nextStepOpen$;

  linear = this.stepperService.isLinear$;

  completed = this.stepperService.isCompleted$;

  constructor(
    private stepperService: StepperNextService,
    private viewContainer: ViewContainerRef,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
  }

  goBack() {
    this.stepperService.changeFromLinear();
    this.stepperService.openNextStep(3);

    setTimeout(() => {
      this.stepperService.changeToLinear();
    }, 500);
  }

  @ViewChild('header') header!: TemplateRef<any>;
  @ViewChild('backgroundImg') bgImg!: ElementRef;

  headerTemplate!: HTMLElement;
  stepsCount?: number;
  stepsCountArray = [];

  ngAfterViewInit() {
    setTimeout(() => { // ExpressionChangedAfterItHasBeenCheckedError
      this.headerTemplate = this.viewContainer.createEmbeddedView(this.header).rootNodes[0];

      const headerContainer = this.elRef.nativeElement.querySelector('.mat-horizontal-stepper-header-container');

      headerContainer?.prepend(this.headerTemplate);

      const div = document.createElement('div');
      div.classList.add('custom-line');
      const linesCollection = document.getElementsByClassName('mat-stepper-horizontal-line');
      linesCollection[0].appendChild(div);
    }, 100)

    this.stepsCount = this.document.getElementsByClassName('mat-horizontal-stepper-content').length;
    this.stepsCountArray.length = this.stepsCount;
    // this.getSteps()

    this.activeComponent();
  }

  /* steps$: HTMLElement[] | undefined;

  getSteps() {
   this.steps$ = Array.from(this.document.getElementsByClassName('mat-horizontal-stepper-content')) as HTMLElement[];

    from(this.steps$)
      .subscribe((step: any ) => {
        if(!step.classList.contains('mat-horizontal-stepper-content-inactive')) {
          console.log(step)
        }
      })
  } */

  @ViewChild(CreateProjectComponent) project!: CreateProjectComponent;
  @ViewChild(CreateBoardComponent) board!: CreateBoardComponent;
  @ViewChild(CreateIssueTypesComponent) issue!: CreateIssueTypesComponent;
  @ViewChild(AddUsersComponent) users!: AddUsersComponent;

  activeIndex = 1; // shesacvleli iqneba tu davimaxsovrebt actiur steps refreshamde // localStorage
  src: string[] = src;
  srcIndex: number = 0;

  getActiveStep(event: any) {
    this.activeIndex = event.selectedIndex + 1;

    Array.from(document.getElementsByClassName('counter')).forEach(item => {
      item.setAttribute("style", `transform: translateY(-${event.selectedIndex * 2}rem`);
    })

    Array.from(document.getElementsByClassName('description-1')).forEach(item => {
      item.setAttribute("style", `transform: translateX(-${event.selectedIndex * 100}%`);
    })

    const customLine = document.querySelector('.custom-line') as HTMLElement;
    const label = document.querySelectorAll('.mat-step-label');
    const linesCollection = document.getElementsByClassName('mat-stepper-horizontal-line');
    const height = linesCollection[0].getBoundingClientRect().height
    let index: number = 0;

    this.bgImg.nativeElement.classList.add('img');

    setTimeout(() => {
      Array.from(label).forEach((lab, i) => {
        if (lab.classList.contains('mat-step-label-selected')) {
          setTimeout(() => {
            this.srcIndex = i
            setTimeout(() => {
              this.bgImg.nativeElement.classList.remove('img');
            }, 400)
          }, 300)
          index = i;
        }
      })
      customLine.style.height = height * index + 30 * index + 'px';
    }, 100)

    this.activeComponent();
  }

  activeComponent() {
    switch (this.activeIndex - 1) {
      case 0:
        this.project.projectComponent(0);
        break
      case 1:
        this.board.boardComponent(1);
        break
      case 2:
        this.issue.issueComponent(2);
        break
      case 3:
        this.users.usersComponent(3);
        break
    }
  }

  stepperInfo = stepper;
}
