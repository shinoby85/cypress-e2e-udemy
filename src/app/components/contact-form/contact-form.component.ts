import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  isSubmitting = signal<boolean>(false);

  timerId?: ReturnType<typeof setTimeout>;

  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    message: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    name: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email]
    })
  })

  constructor() {
    effect(() => {
      if (this.isSubmitting()) {
        console.log('Submitting...');
        this.timerId = setTimeout(() => {
          this.isSubmitting.set(false);
        }, 1000);
      }
    });
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.timerId);
    })
  }

  submitHandler(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      ['message', 'name', 'email'].forEach(field => {
        if (!this.form.get(field)?.value) {
          this.form.get(field)?.markAsDirty();
          this.form.get(field)?.markAsTouched();
        }

      });
      return;
    }
    this.isSubmitting.set(true);
  }

  controlIsInvalid(controlName: 'message' | 'name' | 'email'): boolean {
    return this.form.controls[controlName].touched &&
      this.form.controls[controlName].invalid &&
      (this.form.controls[controlName].pristine || this.form.controls[controlName].dirty);
  }
}
