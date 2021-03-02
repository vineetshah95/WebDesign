import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAdvisorComponent } from './change-password-advisor.component';

describe('ChangePasswordAdvisorComponent', () => {
  let component: ChangePasswordAdvisorComponent;
  let fixture: ComponentFixture<ChangePasswordAdvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordAdvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
