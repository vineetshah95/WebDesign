import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTrackerWishlistComponent } from './app-tracker-wishlist.component';

describe('AppTrackerWishlistComponent', () => {
  let component: AppTrackerWishlistComponent;
  let fixture: ComponentFixture<AppTrackerWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTrackerWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTrackerWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
