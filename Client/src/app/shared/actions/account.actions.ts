import { PayloadAction } from '../models/payload-action';
import { UserInfo } from '../models/user-info';
import { Action } from '@ngrx/store';

export class AccountActions {
  static GET_ACCOUNT_INFO = '[Shared] - Get Account Info';
  static STORE_ACCOUNT_INFO = '[Shared] - Store Account Info';

  getAccountInfo(): Action {
    return {
      type: AccountActions.GET_ACCOUNT_INFO,
    };
  }

  storeAccountInfo(data: UserInfo): PayloadAction<UserInfo> {
    return {
      type: AccountActions.STORE_ACCOUNT_INFO,
      payload: data,
    };
  }
}
