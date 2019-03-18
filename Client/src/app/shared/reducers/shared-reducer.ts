import { Action } from '@ngrx/store';
import { SharedState, SharedStateRecord } from './shared-state';
import { PayloadAction } from '../models/payload-action';
import { UserInfo } from '../models/user-info';
import { AccountActions } from '../actions/account.actions';
import { LocationActions } from '../actions/location.actions';
import { LocationInfo } from '../models/location-info';
import { List } from 'immutable';

const initialState: SharedState = (new SharedStateRecord() as unknown) as SharedState;

export function sharedReducer(state: SharedState = initialState, action: Action) {
  return {
    userInfo: userInfo(state.userInfo, action),
    myLocations: myLocations(state.myLocations, action),
    loggedIn: loggedIn(state.loggedIn, action),
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

export function loggedIn(state = initialState.loggedIn, action: PayloadAction<any>): boolean {
  switch (action.type) {
    case AccountActions.STORE_ACCOUNT_INFO:
      return !!action.payload;
    case AccountActions.RESPONSE_ACCOUNT_LOGOUT:
      if (action.payload === true) {
        return false;
      }
      return state;
    default:
      return state;
  }
}

export function myLocations(state = initialState.myLocations, action: PayloadAction<any>): List<LocationInfo> {
  switch (action.type) {
    case LocationActions.STORE_MY_LOCATIONS:
      return action.payload ? List(action.payload) : state;
    default:
      return state;
  }
}
