import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  addTask = output<{title: string; summary: string; category: string;}>();
  cancel = output();

  form = new FormGroup({
    title: new FormControl("", {
      validators: [Validators.required]
    }),
    summary: new FormControl("", {validators: [Validators.required]}),
    category: new FormControl("moderate"),
  });

  submitHandler(event: Event) {
    event.preventDefault();

    const enteredTitle = this.form.controls.title.value || '';
    const enteredSummary = this.form.controls.summary.value || '';
    const chosenCategory = this.form.controls.category.value || '';

    if (this.form.invalid) {
      return;
    }

    const taskData = {
      title: enteredTitle,
      summary: enteredSummary,
      category: chosenCategory,
    };
    this.addTask.emit(taskData);
  }
}
