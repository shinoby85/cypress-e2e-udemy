import {Component, signal} from '@angular/core';
import {CourseGoalComponent} from '../course-goal/course-goal.component';

interface Goals {
  id: number,
  text: string;
  icon: string;
}

const GOALS = [
  {
    id: 1,
    icon: 'install_desktop',
    text: 'Learn how to install & start Cypress',
  },
  {
    id: 2,
    icon: 'edit',
    text: 'Learn how to write tests with Cypress',
  },
  {
    id: 3,
    icon: 'terminal',
    text: 'Understand the core Cypress features & commands',
  },
  {
    id: 4,
    icon: 'supervisor_account',
    text: 'Learn how to write good tests & follow best practices',
  },
  {
    id: 5,
    icon: 'key',
    text: 'Dive into more complex problems - e.g., user authentication testing',
  }
];

@Component({
  selector: 'app-course-goals',
  imports: [
    CourseGoalComponent
  ],
  templateUrl: './course-goals.component.html',
  styleUrl: './course-goals.component.css'
})
export class CourseGoalsComponent {
  goals = signal<Goals[]>(GOALS);
}
