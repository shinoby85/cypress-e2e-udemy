import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

const user = {
  location: {
    lat: 0,
    lng: 0,
    url: '',
  },
};

@Component({
  selector: 'app-root',
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public existingTimer?: number;
  title = 'cypress-e2e-udemy';
  public getLocBtn = document.getElementById('get-location');
  public form = document.querySelector('form');
  @ViewChild('error') elErr?: ElementRef<HTMLParagraphElement>;
  @ViewChild('infoMessage') infoMsg?: ElementRef<HTMLDivElement>;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = false;
  }

  public getUserLocation(event: MouseEvent) {
    const clickedBtn = event.target as HTMLButtonElement;
    const container = clickedBtn.parentNode as HTMLParagraphElement;
    if ('geolocation' in navigator) {
      clickedBtn.disabled = true;
      clickedBtn.innerHTML = '<span class="loader"></span>';
      navigator.geolocation.getCurrentPosition(
        function (position) {
          user.location.lat = position.coords.latitude;
          user.location.lng = position.coords.longitude;
          user.location.url = `https://www.bing.com/maps?cp=${user.location.lat}~${user.location.lng}&lvl=15&style=r`;
          container.insertBefore(
            document.createTextNode('Location fetched!'),
            clickedBtn
          );
          container.querySelector('svg')?.classList.add('active');
          container.removeChild(clickedBtn);
          const containerBtn = container.querySelector('button');
          containerBtn!.disabled = false;
          containerBtn!.classList.add('active');
        }, () => {
          this.displayInfoMessage(
            'Your browser or permission settings do not allow location fetching.'
          );
        });
    } else {
      this.displayInfoMessage(
        'Your browser or permission settings do not allow location fetching.'
      );
    }
  }

  public shareLocation(event: FormDataEvent) {
    // Use clipboard API to copy the location to the clipboard
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const userName = fd.get('name') as string;

    if (
      userName.trim() === '' ||
      user.location.lat === 0 ||
      user.location.lng === 0
    ) {
      this.elErr!.nativeElement.textContent =
        'Please enter your name and get your location first!';
      return;
    }

    this.elErr!.nativeElement.textContent = '';

    const storedUrl = localStorage.getItem(userName);
    if (storedUrl) {
      this.copyToClipboard(storedUrl, 'Stored location URL copied to clipboard.');
      return;
    }

    user.location.url += `&sp=point.${user.location.lat}_${
      user.location.lng
    }_${encodeURI(userName)}`;

    localStorage.setItem(userName, user.location.url);
    this.copyToClipboard(user.location.url, 'Location URL copied to clipboard.');
  }

  public displayInfoMessage(message: string) {
    if (this.existingTimer) {
      clearTimeout(this.existingTimer);
    }
    (this.infoMsg!.nativeElement.firstChild as HTMLParagraphElement).textContent = message;
    this._renderer.addClass(this.infoMsg!.nativeElement, 'visible');
    this.existingTimer = window.setTimeout(() => {
      this._renderer.removeClass(this.infoMsg!.nativeElement, 'visible');
    }, 2000);
  }

  public copyToClipboard(data: string, infoText: string) {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(data).then(
        () => {
          this.displayInfoMessage(infoText);
        },
        () => {
          this.displayInfoMessage('Failed to copy location URL to clipboard.');
        }
      );
    }
  }
}

