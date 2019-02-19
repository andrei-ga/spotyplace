import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';
import { AccountActions } from './actions/account.actions';
import { AccountEffects } from './effects/account-effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [MatButtonModule, MatCardModule, MatToolbarModule, MatGridListModule];

@NgModule({
  declarations: [TopNavComponent],
  imports: [CommonModule, ...materialModules, HttpClientModule, RouterModule, EffectsModule.forFeature([AccountEffects])],
  exports: [TopNavComponent, ...materialModules],
  providers: [AccountService, AccountActions, AccountEffects],
})
export class SharedModule {}
