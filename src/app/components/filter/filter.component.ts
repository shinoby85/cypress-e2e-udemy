import {Component, output} from '@angular/core';
import {FilterCategory} from '../../app.component';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter = output<FilterCategory>();

  filterChangeHandler(event: Event) {
    this.filter.emit((event.target as HTMLSelectElement).value as FilterCategory);
  }
}

