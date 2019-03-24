import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';
import { TranslateService } from '@ngx-translate/core';
import { AccountActions } from '../../actions/account.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  userInfo$: Observable<UserInfo>;

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
    private accountActions: AccountActions,
    private router: Router
  ) {
    this.userInfo$ = this.store.select(getUserInfo);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.store.dispatch(this.accountActions.requestAccountLogout());
    this.router.navigate(['/']);
  }
}
