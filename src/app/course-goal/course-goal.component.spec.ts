import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGoalComponent } from './course-goal.component';

describe('CourseGoalComponent', () => {
  let component: CourseGoalComponent;
  let fixture: ComponentFixture<CourseGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
