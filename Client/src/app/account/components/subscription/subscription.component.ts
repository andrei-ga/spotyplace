import { Component } from '@angular/core';
import { BillingService } from '../../../shared/services/billing.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  constructor(private billingService: BillingService) {}

  openPortal() {
    this.billingService.openPortal();
  }

  openSubscription() {
    this.billingService.openSubscription();
  }
}
