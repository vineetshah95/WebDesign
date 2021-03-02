import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAdvisorComponent } from './user-profile-advisor.component';

describe('UserProfileAdvisorComponent', () => {
  let component: UserProfileAdvisorComponent;
  let fixture: ComponentFixture<UserProfileAdvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileAdvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
