import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../shared/models/user-info';
import { getUserInfo } from '../../../shared/reducers/shared-selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo);
  }
}
