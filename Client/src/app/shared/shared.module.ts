import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';
import { AccountActions } from './actions/account.actions';
import { AccountEffects } from './effects/account-effects';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

const materialModules = [MatButtonModule, MatCardModule, MatToolbarModule, MatGridListModule, MatMenuModule, MatIconModule];

@NgModule({
  declarations: [TopNavComponent],
  imports: [CommonModule, ...materialModules, RouterModule, EffectsModule.forFeature([AccountEffects]), TranslateModule],
  exports: [TopNavComponent, ...materialModules, TranslateModule],
  providers: [AccountService, AccountActions, AccountEffects],
})
export class SharedModule {}
