import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../../shared/models/subscription-plan';
import { BillingService } from '../../../shared/services/billing.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getSubscriptionPlans } from '../../../shared/reducers/shared-selectors';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  subscriptionPlans$: Observable<SubscriptionPlan[]> = null;

  constructor(private billingService: BillingService, private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptionPlans$ = this.store.select(getSubscriptionPlans);
  }
}
