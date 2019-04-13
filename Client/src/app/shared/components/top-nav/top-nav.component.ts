import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';
import { TranslateService } from '@ngx-translate/core';
import { AccountActions } from '../../actions/account.actions';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  userInfo$: Observable<UserInfo>;

  displayLangMenu = true;

  noLangMenuUrls = ['/cookies'];

  constructor(
    private store: Store<AppState>,
    public translate: TranslateService,
    private accountActions: AccountActions,
    private router: Router
  ) {
    this.userInfo$ = this.store.select(getUserInfo);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.displayLangMenu = this.noLangMenuUrls.findIndex((url: string) => (event as any).url.startsWith(url)) === -1;
    });
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.store.dispatch(this.accountActions.requestAccountLogout());
    this.router.navigate(['/']);
  }
}
