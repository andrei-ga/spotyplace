import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { SharedModule } from '../shared/shared.module';
import { MyLocationsComponent } from './components/my-locations/my-locations.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { DrawMapComponent } from './components/draw-map/draw-map.component';

@NgModule({
  declarations: [AccountComponent, MyLocationsComponent, AccountInfoComponent, LoginComponent, SubscriptionComponent, DrawMapComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
