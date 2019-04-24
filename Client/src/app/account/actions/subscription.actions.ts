import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { SubscriptionPlan } from '../../shared/models/subscription-plan';
import { PayloadAction } from '../../shared/models/payload-action';

@Injectable()
export class SubscriptionActions {
  static GET_SUBSCRIPTION_PLANS = '[Account] Get Subscription Plans';
  static STORE_SUBSCRIPTION_PLANS = '[Account] Store Subscription Plans';

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
}
