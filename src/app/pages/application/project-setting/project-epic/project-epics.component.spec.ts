import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEpicsComponent } from './project-epics.component';

describe('ProjectEpicComponent', () => {
  let component: ProjectEpicsComponent;
  let fixture: ComponentFixture<ProjectEpicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEpicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
