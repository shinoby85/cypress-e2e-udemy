import {Component, input} from '@angular/core';
import {TaskComponent} from '../task/task.component';
import {TaskDataType} from '../../app.component';

@Component({
  selector: 'app-task-list',
  imports: [
    TaskComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks = input<(TaskDataType & {id: string})[]>();
}
