import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<AppState>) {
    this.userInfo$ = this.store.select(getUserInfo);
  }
}
