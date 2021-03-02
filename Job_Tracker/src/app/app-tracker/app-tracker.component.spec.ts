import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTrackerComponent } from './app-tracker.component';

describe('AppTrackerComponent', () => {
  let component: AppTrackerComponent;
  let fixture: ComponentFixture<AppTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
