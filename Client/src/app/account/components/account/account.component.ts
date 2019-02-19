import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../shared/models/user-info';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getUserInfo } from '../../../shared/reducers/shared-selectors';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<AppState>) {
    this.userInfo$ = this.store.select(getUserInfo);
  }
}
