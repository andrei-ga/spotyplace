import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../../shared/services/billing.service';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../../shared/models/subscription-plan';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getSubscriptionPlans } from '../../reducers/account-selectors';
import { SubscriptionActions } from '../../actions/subscription.actions';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  subscriptionPlans$: Observable<SubscriptionPlan[]> = null;

  constructor(private billingService: BillingService, private store: Store<AppState>, private subscriptionActions: SubscriptionActions) {
    this.store.dispatch(this.subscriptionActions.getSubscriptionPlans());
  }

  ngOnInit() {
    this.subscriptionPlans$ = this.store.select(getSubscriptionPlans);
  }

  openPortal() {
    this.billingService.openPortal();
  }

  openSubscription(planId: string) {
    this.billingService.openSubscription(planId);
  }
}
