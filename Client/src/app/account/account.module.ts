import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { SharedModule } from '../shared/shared.module';
import { MyLocationsComponent } from './components/my-locations/my-locations.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountComponent, MyLocationsComponent, AccountInfoComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule, FormsModule],
})
export class AccountModule {}
