import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { UserInfo } from '../models/user-info';
import { AccountActions } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, private accountService: AccountService, private accountActions: AccountActions) {}

  @Effect()
  getProfiles: Observable<Action> = this.actions$.pipe(
    ofType(AccountActions.GET_ACCOUNT_INFO),
    switchMap(() => this.accountService.getAccountInfo()),
    map((data: UserInfo) => this.accountActions.storeAccountInfo(data))
  );
}
