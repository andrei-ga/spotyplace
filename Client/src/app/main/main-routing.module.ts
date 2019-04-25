import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CookiesDeclarationComponent } from './components/cookies-declaration/cookies-declaration.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'cookies',
    component: CookiesDeclarationComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
