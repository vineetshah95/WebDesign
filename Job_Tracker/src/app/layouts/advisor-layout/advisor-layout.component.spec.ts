import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorLayoutComponent } from './advisor-layout.component';

describe('AdvisorLayoutComponent', () => {
  let component: AdvisorLayoutComponent;
  let fixture: ComponentFixture<AdvisorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
