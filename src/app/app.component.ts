import {Component, HostListener, OnInit} from '@angular/core';
import {ElementListenerDirective} from './element-listener.directive';


@Component({
  selector: 'app-root',
  imports: [
    ElementListenerDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'cypress-e2e-udemy';
  public getLocBtn = document.getElementById('get-location');
  public form = document.querySelector('form');

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = false;
  }


}

