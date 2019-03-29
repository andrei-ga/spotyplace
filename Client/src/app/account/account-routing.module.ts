import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { MyLocationsComponent } from './components/my-locations/my-locations.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
