import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SubscriptionCompleteComponent } from './components/subscription-complete/subscription-complete.component';

@NgModule({
  declarations: [SubscriptionCompleteComponent],
  imports: [CommonModule, SubscriptionRoutingModule, SharedModule],
})
export class SubscriptionModule {}
