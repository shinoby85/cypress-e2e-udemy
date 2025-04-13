import {Component, input} from '@angular/core';

const CATEGORY_ICONS = {
  urgent: '🚨',
  important: '🔴',
  moderate: '🔵',
  low: '🟢',
};

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  categoryIcons = CATEGORY_ICONS;
  category = input.required<string>();
  title = input.required<string>()
  summary = input.required<string>()
}
