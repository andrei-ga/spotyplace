import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cookies-declaration',
  templateUrl: './cookies-declaration.component.html',
  styleUrls: ['./cookies-declaration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CookiesDeclarationComponent implements OnInit, OnDestroy {
  ngOnInit() {
    const cookie = document.querySelector('.CookieDeclaration');
    if (cookie) {
      cookie.parentElement.style.display = '';
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://consent.cookiebot.com/4e07ff0c-bfdc-4bea-9581-b1e5820fc29b/cd.js';
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  }

  ngOnDestroy() {
    const cookie = document.querySelector('.CookieDeclaration');
    if (cookie) {
      cookie.parentElement.style.display = 'none';
    }
  }
}
