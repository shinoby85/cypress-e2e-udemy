import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

const user = {
  location: {
    lat: 0,
    lng: 0,
    url: '',
  },
};

@Directive({
  selector: '[appElListener]'
})
export class ElementListenerDirective {
  public existingTimer?: NodeJS.Timeout;

  @Input('appElListenerErr') elErr!: ElementRef<HTMLParagraphElement>;
  @Input('appElListenerInfoMessage') infoMsg!: ElementRef<HTMLDivElement>;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }

  @HostListener('click', ['$event']) elClick(event: MouseEvent) {
    if ((event.target as HTMLButtonElement)?.id === 'get-location') {
      this.getUserLocation(event);
    }
  }

  @HostListener('submit', ['$event']) elSubmit(event: any) {
    if (event.target.tagName === 'form') {
      this.shareLocation(event);
    }
  }

  public getUserLocation(event: MouseEvent) {
    const clickedBtn = event.target as HTMLButtonElement;
    const container = clickedBtn.parentNode as HTMLParagraphElement;
    if ('geolocation' in navigator) {
      clickedBtn.disabled = true;
      clickedBtn.innerHTML = '<span class="loader"></span>';
      navigator.geolocation.getCurrentPosition(function (position) {
        user.location.lat = position.coords.latitude;
        user.location.lng = position.coords.longitude;
        user.location.url = `https://www.bing.com/maps?cp=${user.location.lat}~${user.location.lng}&lvl=15&style=r`;
        container.insertBefore(
          document.createTextNode('Location fetched!'),
          clickedBtn
        );
        container.querySelector('svg').classList.add('active');
        container.removeChild(clickedBtn);
        container.querySelector('button').disabled = false;
        container.querySelector('button').classList.add('active');
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

  public shareLocation(event) {
    // Use clipboard API to copy the location to the clipboard
    event.preventDefault();
    const fd = new FormData(event.target);
    const userName = fd.get('name') as string;

    if (
      userName.trim() === '' ||
      user.location.lat === 0 ||
      user.location.lng === 0
    ) {
      this.elErr.nativeElement.textContent =
        'Please enter your name and get your location first!';
      return;
    }

    this.elErr.nativeElement.textContent = '';

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
    (this.infoMsg.nativeElement.firstChild as HTMLParagraphElement).textContent = message;
    this._renderer.addClass(this.infoMsg.nativeElement, 'visible');
    this.existingTimer = setTimeout(() => {
      this._renderer.removeClass(this.infoMsg.nativeElement, 'visible');
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
