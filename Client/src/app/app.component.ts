import { Component, HostListener } from '@angular/core';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import { AccountActions } from './shared/actions/account.actions';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { StorageEnum } from './shared/models/storage.enum';
import { AccountService } from './shared/services/account.service';
import { LocationActions } from './shared/actions/location.actions';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:CookiebotOnAccept', ['$event'])
  cookieBotOnAccept(event) {
    this.storageService.setPreferencesCookiesAccepted(event.currentTarget.Cookiebot.consent.preferences);
    this.accountService.checkCookies().subscribe();
  }

  @HostListener('window:CookiebotOnDecline', ['$event'])
  cookieBotOnDecline(event) {
    this.storageService.setPreferencesCookiesAccepted(event.currentTarget.Cookiebot.consent.preferences);
    this.accountService.checkCookies().subscribe();
  }

  constructor(
    private store: Store<AppState>,
    private accountActions: AccountActions,
    private locationActions: LocationActions,
    private translate: TranslateService,
    private accountService: AccountService,
    private storageService: StorageService
  ) {
    // Initialize translation
    this.translate.addLangs(['gb', 'ro']);
    this.translate.setDefaultLang('gb');
    this.translate.use(StorageService.getValue(StorageEnum.lang, 'gb'));

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.storageService.setValue(StorageEnum.lang, event.lang);
    });

    // Dispatch initial actions
    this.store.dispatch(this.accountActions.getAccountInfo());
    this.store.dispatch(this.locationActions.getLatestLocations());
  }
}
