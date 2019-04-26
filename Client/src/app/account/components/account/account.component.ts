import { Component } from '@angular/core';
import { BillingService } from '../../../shared/services/billing.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private billingService: BillingService) {}

  openPortal() {
    this.billingService.openPortal();
  }
}
