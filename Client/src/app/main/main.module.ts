import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CookiesDeclarationComponent } from './components/cookies-declaration/cookies-declaration.component';

@NgModule({
  declarations: [MainComponent, CookiesDeclarationComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
