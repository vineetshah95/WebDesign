import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDashboardComponent } from './advisor-dashboard.component';

describe('TablesComponent', () => {
  let component: AdvisorDashboardComponent;
  let fixture: ComponentFixture<AdvisorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
