import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { SubscriptionPlan } from '../models/subscription-plan';
import { PayloadAction } from '../models/payload-action';
import { CustomerSubscription } from '../models/customer-subscription';

@Injectable()
export class SubscriptionActions {
  static GET_SUBSCRIPTION_PLANS = '[Account] Get Subscription Plans';
  static STORE_SUBSCRIPTION_PLANS = '[Account] Store Subscription Plans';
  static GET_CURRENT_SUBSCRIPTION = '[Account] Get Current Subscription';
  static STORE_CURRENT_SUBSCRIPTION = '[Account] Store Current Subscription';

  getSubscriptionPlans(): Action {
    return {
      type: SubscriptionActions.GET_SUBSCRIPTION_PLANS,
    };
  }

  storeSubscriptionPlans(data: SubscriptionPlan[]): PayloadAction<SubscriptionPlan[]> {
    return {
      type: SubscriptionActions.STORE_SUBSCRIPTION_PLANS,
      payload: data,
    };
  }

  getCurrentSubscription(): Action {
    return {
      type: SubscriptionActions.GET_CURRENT_SUBSCRIPTION,
    };
  }

  storeCurrentSubscription(data: CustomerSubscription): PayloadAction<CustomerSubscription> {
    return {
      type: SubscriptionActions.STORE_CURRENT_SUBSCRIPTION,
      payload: data,
    };
  }
}
