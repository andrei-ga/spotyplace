import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionPlan } from '../../models/subscription-plan';
import { BillingService } from '../../services/billing.service';
import { SubscriptionPeriodUnitEenum } from '../../models/subscription-period-unit-enum';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss'],
})
export class SubscriptionListComponent implements OnInit {
  @Input()
  subscriptionPlans: SubscriptionPlan[];

  yearlyBilling = '0';

  subscriptionPeriodEnum = SubscriptionPeriodUnitEenum;

  userInfo$: Observable<UserInfo>;

  constructor(private store: Store<AppState>, private billingService: BillingService) {}

  ngOnInit() {
    this.userInfo$ = this.store.select(getUserInfo);
  }

  openSubscription(planId: string) {
    this.billingService.openSubscription(planId);
  }
}
