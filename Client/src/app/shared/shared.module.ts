import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';
import { AccountActions } from './actions/account.actions';
import { AccountEffects } from './effects/account-effects';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationService } from './services/location.service';
import { LocationEffects } from './effects/location-effects';
import { LocationActions } from './actions/location.actions';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatExpansionModule,
  MatSnackBarModule,
];

const sharedEffects = [AccountEffects, LocationEffects];

@NgModule({
  declarations: [TopNavComponent, LocationsListComponent],
  imports: [CommonModule, ...materialModules, RouterModule, EffectsModule.forFeature(sharedEffects), TranslateModule, ReactiveFormsModule],
  exports: [...materialModules, TranslateModule, TopNavComponent, LocationsListComponent, ReactiveFormsModule],
  providers: [...sharedEffects, AccountService, AccountActions, LocationActions, LocationService],
})
export class SharedModule {}
