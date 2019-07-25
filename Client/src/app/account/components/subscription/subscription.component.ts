import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../../shared/services/billing.service';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../../shared/models/subscription-plan';
import { getSubscriptionPlans, getUserInfo } from '../../../shared/reducers/shared-selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { UserInfo } from '../../../shared/models/user-info';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  subscriptionPlans$: Observable<SubscriptionPlan[]> = null;

  userInfo$: Observable<UserInfo>;

  constructor(private billingService: BillingService, private store: Store<AppState>) {}

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo);
    this.subscriptionPlans$ = this.store.select(getSubscriptionPlans);
  }

  openPortal() {
    this.billingService.openPortal();
  }
}
