import {Component} from '@angular/core';
import {ContactFormComponent} from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-about',
  imports: [
    ContactFormComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
