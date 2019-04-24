import { SubscriptionPlan } from '../../shared/models/subscription-plan';
import { List, Record } from 'immutable';

export interface AccountState extends Map<string, any> {
  subscriptionPlans: List<SubscriptionPlan>;
}

export const AccountStateRecord = Record({
  subscriptionPlans: null,
});
