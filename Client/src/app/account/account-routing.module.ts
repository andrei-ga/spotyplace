import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { MyLocationsComponent } from './components/my-locations/my-locations.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from '../shared/guards/login.guard';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { DrawMapComponent } from './components/draw-map/draw-map.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'locations',
      },
      {
        path: 'locations',
        component: MyLocationsComponent,
      },
      {
        path: 'info',
        component: AccountInfoComponent,
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
      {
        path: 'maps',
        component: DrawMapComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
