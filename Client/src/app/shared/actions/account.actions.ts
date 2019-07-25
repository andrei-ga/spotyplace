import { PayloadAction } from '../models/payload-action';
import { UserInfo } from '../models/user-info';
import { Action } from '@ngrx/store';

export class AccountActions {
  static GET_ACCOUNT_INFO = '[Shared] - Get Account Info';
  static STORE_ACCOUNT_INFO = '[Shared] - Store Account Info';
  static REQUEST_ACCOUNT_LOGOUT = '[Shared] - Request Account Logout';
  static RESPONSE_ACCOUNT_LOGOUT = '[Shared] - Response Logout';

  getAccountInfo(syncSubscription: boolean): PayloadAction<boolean> {
    return {
      type: AccountActions.GET_ACCOUNT_INFO,
      payload: syncSubscription,
    };
  }

  storeAccountInfo(data: UserInfo): PayloadAction<UserInfo> {
    return {
      type: AccountActions.STORE_ACCOUNT_INFO,
      payload: data,
    };
  }

  requestAccountLogout(): Action {
    return {
      type: AccountActions.REQUEST_ACCOUNT_LOGOUT,
    };
  }

  responseAccountLogout(data: boolean): PayloadAction<boolean> {
    return {
      type: AccountActions.RESPONSE_ACCOUNT_LOGOUT,
      payload: data,
    };
  }
}
