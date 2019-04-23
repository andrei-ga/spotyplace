import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionCompleteComponent } from './components/subscription-complete/subscription-complete.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'complete/:subscriptionId',
    component: SubscriptionCompleteComponent,
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
