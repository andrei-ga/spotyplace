import { AppState } from '../../app.reducer';
import { AccountState } from './account-state';
import { SubscriptionPlan } from '../../shared/models/subscription-plan';
import { createSelector } from '@ngrx/store';

export function getAccountState(state: AppState): AccountState {
  return state.account;
}

function fetchSubscriptionPlans(state: AccountState): SubscriptionPlan[] {
  return state.subscriptionPlans ? state.subscriptionPlans.toArray() : null;
}

export const getSubscriptionPlans = createSelector(
  getAccountState,
  fetchSubscriptionPlans
);
