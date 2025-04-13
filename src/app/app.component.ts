import {Component, effect, signal} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskControlComponent} from './components/task-control/task-control.component';
import {ModalComponent} from './components/modal/modal.component';
import {NewTaskComponent} from './components/new-task/new-task.component';

export type FilterCategory = 'urgent' | 'important' | 'moderate' | 'low';

export interface TaskDataType {
  title: string;
  summary: string;
  category: FilterCategory;
}

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    TaskControlComponent,
    ModalComponent,
    NewTaskComponent,
    TaskListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cypress-e2e-udemy';
  tasks = signal<(TaskDataType & { id: string })[]>([]);
  displayedTasks = signal<(TaskDataType & { id: string })[]>([]);
  isAddingTask = signal<boolean>(false);
  appliedFilter = signal<FilterCategory | 'all'>('all');

  constructor() {
    effect(() => {
      const filteredTasks = this.tasks().filter((task) => {
        if (this.appliedFilter() === 'all') {
          return true;
        }
        return task.category === this.appliedFilter();

      });
      this.displayedTasks.set(filteredTasks);
    });
  }

  startAddTaskHandler() {
    this.isAddingTask.set(true);
  }

  cancelAddTaskHandler() {
    this.isAddingTask.set(false);
  }

  setFilterHandler(category: FilterCategory) {
    this.appliedFilter.set(category);
  }

  addTaskHandler(taskData: TaskDataType) {
    this.tasks.update(prevTasks => {
      return [
        ...prevTasks,
        {
          id: Math.random().toString(),
          ...taskData,
        },
      ]
    })
    this.isAddingTask.set(false);
  }
}
