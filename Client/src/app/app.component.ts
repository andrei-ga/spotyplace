import { Component, HostListener } from '@angular/core';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import { AccountActions } from './shared/actions/account.actions';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { StorageEnum } from './shared/models/storage.enum';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  preferencesCookiesAccepted = false;

  @HostListener('window:CookiebotOnAccept', ['$event'])
  cookieBotOnAccept(event) {
    this.preferencesCookiesAccepted = event.currentTarget.Cookiebot.consent.preferences;
    this.accountService.checkCookies().subscribe();
  }

  @HostListener('window:CookiebotOnDecline', ['$event'])
  cookieBotOnDecline(event) {
    this.preferencesCookiesAccepted = event.currentTarget.Cookiebot.consent.preferences;
    this.accountService.checkCookies().subscribe();
  }

  constructor(
    private store: Store<AppState>,
    private accountActions: AccountActions,
    private translate: TranslateService,
    private accountService: AccountService
  ) {
    // Initialize translation
    this.translate.addLangs(['gb', 'ro']);
    this.translate.setDefaultLang('gb');
    this.translate.use(localStorage.getItem(StorageEnum.lang) || 'gb');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.preferencesCookiesAccepted) {
        localStorage.setItem(StorageEnum.lang, event.lang);
      }
    });

    // Dispatch initial actions
    this.store.dispatch(this.accountActions.getAccountInfo());
  }
}
