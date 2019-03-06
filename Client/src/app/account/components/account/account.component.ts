import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../shared/models/user-info';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getMyLocations, getUserInfo } from '../../../shared/reducers/shared-selectors';
import { LocationInfo } from '../../../shared/models/location-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  userInfo$: Observable<UserInfo>;

  myLocations$: Observable<LocationInfo[]>;

  labelOk$: Observable<string>;

  labelErrorOccurred$: Observable<string>;

  constructor(private store: Store<AppState>, private translate: TranslateService) {
    this.userInfo$ = this.store.select(getUserInfo);
    this.myLocations$ = this.store.select(getMyLocations);
    this.labelOk$ = this.translate.get('Ok');
    this.labelErrorOccurred$ = this.translate.get('AnErrorOccurred');
  }
}
