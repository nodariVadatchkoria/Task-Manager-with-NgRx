import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSignUpComponent } from './home-sign-up.component';

describe('HomeSignUpComponent', () => {
  let component: HomeSignUpComponent;
  let fixture: ComponentFixture<HomeSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
