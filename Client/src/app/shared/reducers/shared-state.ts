import { UserInfo } from '../models/user-info';
import { List, Record } from 'immutable';
import { LocationInfo } from '../models/location-info';
import { SubscriptionPlan } from '../models/subscription-plan';

export interface SharedState extends Map<string, any> {
  userInfo: UserInfo;

  myLocations: List<LocationInfo>;

  latestLocations: List<LocationInfo>;

  loggedIn: boolean;

  subscriptionPlans: List<SubscriptionPlan>;
}

export const SharedStateRecord = Record({
  userInfo: null,

  myLocations: null,

  latestLocations: null,

  loggedIn: null,

  subscriptionPlans: null,
});
