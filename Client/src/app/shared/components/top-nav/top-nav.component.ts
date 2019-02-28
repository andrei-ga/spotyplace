import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<AppState>, private translate: TranslateService) {
    this.userInfo$ = this.store.select(getUserInfo);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
