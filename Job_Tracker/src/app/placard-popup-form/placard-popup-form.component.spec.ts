import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacardPopupFormComponent } from './placard-popup-form.component';

describe('PlacardPopupFormComponent', () => {
  let component: PlacardPopupFormComponent;
  let fixture: ComponentFixture<PlacardPopupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacardPopupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacardPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
