import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { SharedModule } from '../shared/shared.module';
import { CreateLocationComponent } from './components/create-location/create-location.component';

@NgModule({
  declarations: [LoginComponent, AccountComponent, CreateLocationComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
