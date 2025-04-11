import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {CourseGoalsComponent} from './course-goals/course-goals.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CourseGoalsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cypress-e2e-udemy';
}
