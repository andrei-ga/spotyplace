import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BillingService } from '../../shared/services/billing.service';
import { Observable } from 'rxjs';
import { SubscriptionActions } from '../actions/subscription.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SubscriptionPlan } from '../../shared/models/subscription-plan';
import { PayloadAction } from '../../shared/models/payload-action';
import { filter } from 'rxjs/internal/operators/filter';

@Injectable()
export class SubscriptionEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private billingService: BillingService,
    private subscriptionActions: SubscriptionActions
  ) {}

  @Effect()
  getSubscriptionPlans: Observable<Action> = this.actions$.pipe(
    ofType(SubscriptionActions.GET_SUBSCRIPTION_PLANS),
    withLatestFrom(this.store),
    filter(([, state]: [PayloadAction<string>, AppState]) => !(state.account && state.account.subscriptionPlans)),
    switchMap(() => this.billingService.getSubscriptionPlans()),
    map((data: SubscriptionPlan[]) => this.subscriptionActions.storeSubscriptionPlans(data))
  );
}
