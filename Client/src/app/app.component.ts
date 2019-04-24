import { AfterViewInit, Component, HostListener } from '@angular/core';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import { AccountActions } from './shared/actions/account.actions';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { StorageEnum } from './shared/models/storage.enum';
import { AccountService } from './shared/services/account.service';
import { LocationActions } from './shared/actions/location.actions';
import { StorageService } from './shared/services/storage.service';
import { environment } from '../environments/environment';
import { SubscriptionActions } from './shared/actions/subscription.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  appLanguages = ['gb', 'ro'];

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
    private subscriptionActions: SubscriptionActions,
    private translate: TranslateService,
    private accountService: AccountService,
    private storageService: StorageService
  ) {
    // Get browser language
    let language = navigator.language || (navigator as any).userLanguage;
    if (language) {
      language = language.substring(language.indexOf('-') + 1).toLowerCase();
    }
    if (this.appLanguages.indexOf(language) === -1) {
      language = 'gb';
    }

    // Initialize translation
    this.translate.addLangs(this.appLanguages);
    this.translate.setDefaultLang('gb');
    this.translate.use(StorageService.getValue(StorageEnum.lang, language));

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.storageService.setValue(StorageEnum.lang, event.lang);
    });

    // Dispatch initial actions
    this.store.dispatch(this.accountActions.getAccountInfo());
    this.store.dispatch(this.locationActions.getLatestLocations());
    this.store.dispatch(this.subscriptionActions.getSubscriptionPlans());
  }

  ngAfterViewInit() {
    (window as any).Chargebee.init({
      site: environment.CHARGEBEE_SITE_ID,
    });
  }
}
