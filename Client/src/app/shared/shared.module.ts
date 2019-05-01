import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';
import { AccountActions } from './actions/account.actions';
import { AccountEffects } from './effects/account-effects';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationService } from './services/location.service';
import { LocationEffects } from './effects/location-effects';
import { LocationActions } from './actions/location.actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { NotificationService } from './services/notification.service';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { CreateFloorComponent } from './components/create-floor/create-floor.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { UtilsService } from './services/utils.service';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { BottomToolbarComponent } from './components/bottom-toolbar/bottom-toolbar.component';
import { MatPaginatorIntlCustom } from './controls/mat-paginator-intl-custom';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SubscriptionEffects } from './effects/subscription-effects';
import { SubscriptionActions } from './actions/subscription.actions';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';

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
  MatPaginatorModule,
  MatTooltipModule,
  MatRadioModule,
  MatChipsModule,
  MatAutocompleteModule,
];

const sharedEffects = [AccountEffects, LocationEffects, SubscriptionEffects];

@NgModule({
  declarations: [
    TopNavComponent,
    LocationsListComponent,
    CreateLocationComponent,
    SimpleDialogComponent,
    CreateFloorComponent,
    InputDialogComponent,
    BottomToolbarComponent,
    EnumToArrayPipe,
    SubscriptionListComponent,
  ],
  entryComponents: [SimpleDialogComponent, InputDialogComponent],
  imports: [
    CommonModule,
    ...materialModules,
    RouterModule,
    EffectsModule.forFeature(sharedEffects),
    TranslateModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  exports: [
    ...materialModules,
    TranslateModule,
    TopNavComponent,
    LocationsListComponent,
    CreateLocationComponent,
    ReactiveFormsModule,
    SimpleDialogComponent,
    CreateFloorComponent,
    MaterialFileInputModule,
    InputDialogComponent,
    FormsModule,
    BottomToolbarComponent,
    EnumToArrayPipe,
    SubscriptionListComponent,
  ],
  providers: [
    ...sharedEffects,
    AccountService,
    AccountActions,
    LocationActions,
    SubscriptionActions,
    LocationService,
    NotificationService,
    LoggedInGuard,
    UtilsService,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new MatPaginatorIntlCustom();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService],
    },
  ],
})
export class SharedModule {}
