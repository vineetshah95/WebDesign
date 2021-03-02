import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistItemComponent } from './tasklist-item.component';

describe('TasklistItemComponent', () => {
  let component: TasklistItemComponent;
  let fixture: ComponentFixture<TasklistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasklistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
