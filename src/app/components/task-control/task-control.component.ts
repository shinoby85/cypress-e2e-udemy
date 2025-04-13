import {Component, output} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-task-control',
  imports: [
    FilterComponent
  ],
  templateUrl: './task-control.component.html',
  styleUrl: './task-control.component.css'
})
export class TaskControlComponent {
  setAddTask = output();
  setFilter = output();
}
