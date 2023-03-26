import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicAddEditComponent } from './epic-add-edit.component';

describe('EpicAddEditComponent', () => {
  let component: EpicAddEditComponent;
  let fixture: ComponentFixture<EpicAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
