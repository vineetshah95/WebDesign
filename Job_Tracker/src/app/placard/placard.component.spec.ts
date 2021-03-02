import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacardComponent } from './placard.component';

describe('PlacardComponent', () => {
  let component: PlacardComponent;
  let fixture: ComponentFixture<PlacardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
