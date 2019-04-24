import { Component, Input } from '@angular/core';
import { SubscriptionPlan } from '../../models/subscription-plan';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss'],
})
export class SubscriptionListComponent {
  @Input()
  subscriptionPlans: SubscriptionPlan[];

  yearlyBilling = '0';

  constructor(private billingService: BillingService) {}

  openSubscription(planId: string) {
    this.billingService.openSubscription(planId);
  }
}
