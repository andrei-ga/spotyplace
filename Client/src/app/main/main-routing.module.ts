import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CookiesDeclarationComponent } from './components/cookies-declaration/cookies-declaration.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'cookies',
    component: CookiesDeclarationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
