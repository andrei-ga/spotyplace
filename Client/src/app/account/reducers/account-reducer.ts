import { AccountState, AccountStateRecord } from './account-state';
import { Action } from '@ngrx/store';
import { PayloadAction } from '../../shared/models/payload-action';
import { SubscriptionPlan } from '../../shared/models/subscription-plan';
import { List } from 'immutable';
import { SubscriptionActions } from '../actions/subscription.actions';

const initialState: AccountState = (new AccountStateRecord() as unknown) as AccountState;

export function accountReducer(state: AccountState = initialState, action: Action) {
  return {
    subscriptionPlans: subscriptionPlans(state.subscriptionPlans, action),
  };
}

export function subscriptionPlans(state = initialState.subscriptionPlans, action: PayloadAction<any>): List<SubscriptionPlan> {
  switch (action.type) {
    case SubscriptionActions.STORE_SUBSCRIPTION_PLANS:
      return List(action.payload);
    default:
      return state;
  }
}
