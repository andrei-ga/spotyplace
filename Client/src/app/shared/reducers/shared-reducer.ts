import { Action } from '@ngrx/store';
import { SharedState, SharedStateRecord } from './shared-state';
import { PayloadAction } from '../models/payload-action';
import { UserInfo } from '../models/user-info';
import { AccountActions } from '../actions/account.actions';

const initialState: SharedState = (new SharedStateRecord() as unknown) as SharedState;

export function sharedReducer(state: SharedState = initialState, action: Action) {
  return {
    userInfo: userInfo(state.userInfo, action),
  };
}

export function userInfo(state = initialState.userInfo, action: PayloadAction<any>): UserInfo {
  switch (action.type) {
    case AccountActions.STORE_ACCOUNT_INFO:
      return action.payload;
    case AccountActions.RESPONSE_ACCOUNT_LOGOUT:
      if (action.payload === true) {
        return null;
      }
      return state;
    default:
      return state;
  }
}
