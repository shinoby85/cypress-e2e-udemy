import {Component, input} from '@angular/core';
import {FilterCategory} from '../../app.component';

const CATEGORY_ICONS = {
  urgent: '🚨',
  important: '🔴',
  moderate: '🔵',
  low: '🟢'
};

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  categoryIcons: Record<FilterCategory, string> = CATEGORY_ICONS;
  category = input.required<FilterCategory>();
  title = input.required<string>()
  summary = input.required<string>()
}
