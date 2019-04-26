import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../../shared/services/billing.service';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../../shared/models/subscription-plan';
import { getCurrentSubscription, getSubscriptionPlans } from '../../../shared/reducers/shared-selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { CustomerSubscription } from '../../../shared/models/customer-subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  subscriptionPlans$: Observable<SubscriptionPlan[]> = null;

  currentSubscription$: Observable<CustomerSubscription> = undefined;

  constructor(private billingService: BillingService, private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptionPlans$ = this.store.select(getSubscriptionPlans);
    this.currentSubscription$ = this.store.select(getCurrentSubscription);
  }

  openPortal() {
    this.billingService.openPortal();
  }
}
