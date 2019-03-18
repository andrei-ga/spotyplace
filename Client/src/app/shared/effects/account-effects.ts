import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserInfo } from '../models/user-info';
import { AccountActions } from '../actions/account.actions';
import { LocationActions } from '../actions/location.actions';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private accountActions: AccountActions,
    private locationActions: LocationActions
  ) {}

  @Effect()
  getAccountInfo: Observable<Action> = this.actions$.pipe(
    ofType(AccountActions.GET_ACCOUNT_INFO),
    switchMap(() => this.accountService.getInfo()),
    mergeMap((data: UserInfo) => {
      const actions = [this.accountActions.storeAccountInfo(data)];
      if (data !== null) {
        actions.push(this.locationActions.getMyLocations());
      }

      return actions;
    })
  );

  @Effect()
  requestAccountLogout: Observable<Action> = this.actions$.pipe(
    ofType(AccountActions.REQUEST_ACCOUNT_LOGOUT),
    switchMap(() => this.accountService.logout()),
    map((data: boolean) => this.accountActions.responseAccountLogout(data))
  );
}
