import { Action } from '@ngrx/store';
import { SharedState, SharedStateRecord } from './shared-state';
import { PayloadAction } from '../models/payload-action';
import { UserInfo } from '../models/user-info';
import { AccountActions } from '../actions/account.actions';
import { LocationActions } from '../actions/location.actions';
import { LocationInfo } from '../models/location-info';
import { List } from 'immutable';
import { SubscriptionPlan } from '../models/subscription-plan';
import { SubscriptionActions } from '../actions/subscription.actions';
import { CustomerSubscription } from '../models/customer-subscription';

const initialState: SharedState = (new SharedStateRecord() as unknown) as SharedState;

export function sharedReducer(state: SharedState = initialState, action: Action) {
  return {
    userInfo: userInfo(state.userInfo, action),
    myLocations: myLocations(state.myLocations, action),
    latestLocations: latestLocations(state.latestLocations, action),
    loggedIn: loggedIn(state.loggedIn, action),
    subscriptionPlans: subscriptionPlans(state.subscriptionPlans, action),
    currentSubscription: currentSubscription(state.currentSubscription, action),
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
    case AccountActions.RESPONSE_ACCOUNT_LOGOUT:
      if (action.payload === true) {
        return List();
      }
      return state;
    case LocationActions.STORE_MY_LOCATIONS:
      return action.payload ? List(action.payload) : state;
    default:
      return state;
  }
}

export function latestLocations(state = initialState.latestLocations, action: PayloadAction<any>): List<LocationInfo> {
  switch (action.type) {
    case LocationActions.STORE_LATEST_LOCATIONS:
      return action.payload ? List(action.payload) : state;
    default:
      return state;
  }
}

export function subscriptionPlans(state = initialState.subscriptionPlans, action: PayloadAction<any>): List<SubscriptionPlan> {
  switch (action.type) {
    case SubscriptionActions.STORE_SUBSCRIPTION_PLANS:
      return List(action.payload);
    default:
      return state;
  }
}

export function currentSubscription(state = initialState.currentSubscription, action: PayloadAction<any>): CustomerSubscription {
  switch (action.type) {
    case SubscriptionActions.STORE_CURRENT_SUBSCRIPTION:
      return action.payload;
    default:
      return state;
  }
}
