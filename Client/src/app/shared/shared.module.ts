import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
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
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { NotificationService } from './services/notification.service';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { LoggedInGuard } from './guards/logged-in.guard';

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
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
];

const sharedEffects = [AccountEffects, LocationEffects];

@NgModule({
  declarations: [TopNavComponent, LocationsListComponent, CreateLocationComponent, SimpleDialogComponent],
  entryComponents: [SimpleDialogComponent],
  imports: [CommonModule, ...materialModules, RouterModule, EffectsModule.forFeature(sharedEffects), TranslateModule, ReactiveFormsModule],
  exports: [
    ...materialModules,
    TranslateModule,
    TopNavComponent,
    LocationsListComponent,
    CreateLocationComponent,
    ReactiveFormsModule,
    SimpleDialogComponent,
  ],
  providers: [...sharedEffects, AccountService, AccountActions, LocationActions, LocationService, NotificationService, LoggedInGuard],
})
export class SharedModule {}
