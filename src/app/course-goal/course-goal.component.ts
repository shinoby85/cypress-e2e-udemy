import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-course-goal',
  imports: [
    MatIcon
  ],
  templateUrl: './course-goal.component.html',
  styleUrl: './course-goal.component.css'
})
export class CourseGoalComponent {
  icon = input.required<string>();
  text = input.required<string>();
}
