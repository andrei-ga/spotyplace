import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { SharedModule } from '../shared/shared.module';
import { MyLocationsComponent } from './components/my-locations/my-locations.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubscriptionActions } from './actions/subscription.actions';
import { EffectsModule } from '@ngrx/effects';
import { SubscriptionEffects } from './effects/subscription-effects';

const accountEffects = [SubscriptionEffects];

@NgModule({
  declarations: [AccountComponent, MyLocationsComponent, AccountInfoComponent, LoginComponent, SubscriptionComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule, EffectsModule.forFeature(accountEffects)],
  providers: [SubscriptionActions],
})
export class AccountModule {}
