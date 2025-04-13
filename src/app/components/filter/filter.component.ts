import {Component, output, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter = output<string>();

  filterChangeHandler(event: Event) {
    this.filter.emit((event.target as HTMLSelectElement).value);
  }
}
