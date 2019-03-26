import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocationInfo } from '../../../shared/models/location-info';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { MapActions } from '../../actions/map.actions';
import { getLocationById, getLocationLoaded } from '../../reducers/map-selectors';
import { FloorService } from '../../../shared/services/floor.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SimpleDialogData } from '../../../shared/models/simple-dialog-data';
import { FloorInfo } from '../../../shared/models/floor-info';
import { SimpleDialogComponent } from '../../../shared/components/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss'],
})
export class ViewLocationComponent implements OnInit, OnDestroy {
  locationId: string;

  floorId: string;

  selectedFloor: FloorInfo;

  location: LocationInfo;

  loaded$: Observable<boolean>;

  sidenavOpened = true;

  creatingFloor = false;

  labelOk: string;

  labelCancel: string;

  labelErrorOccurred: string;

  labelCancel$: Observable<string>;

  requesting = false;

  locationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<AppState>,
    private mapActions: MapActions,
    private floorService: FloorService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.floorId = params.get('floorId');
      this.locationId = params.get('locationId');
    });

    this.loadLocation();
    this.locationSubscription = this.store.pipe(select(getLocationById(this.locationId))).subscribe((data: LocationInfo) => {
      this.location = data;
      if (this.location && this.location.floors.length) {
        if (!this.floorId) {
          this.router.navigate(['/map', this.locationId, this.location.floors[0].floorId]);
        } else {
          this.selectedFloor = this.location.floors.find((f: FloorInfo) => f.floorId === this.floorId);
        }
      }
    });
    this.loaded$ = this.store.pipe(select(getLocationLoaded));

    this.translate.get('Ok').subscribe((data: string) => {
      this.labelOk = data;
    });
    this.translate.get('Cancel').subscribe((data: string) => {
      this.labelCancel = data;
    });
    this.translate.get('AnErrorOccurred').subscribe((data: string) => {
      this.labelErrorOccurred = data;
    });
    this.labelCancel$ = this.translate.get('Cancel');
  }

  ngOnDestroy() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

  loadLocation() {
    this.store.dispatch(this.mapActions.getLocationData(this.locationId));
  }

  reloadLocation() {
    this.store.dispatch(this.mapActions.refreshLocationData(this.locationId));
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  cancelCreateFloor() {
    this.creatingFloor = false;
  }

  editFloor() {}

  deleteFloor() {
    if (!this.requesting) {
      this.translate.get('AreYouSureYouWantToDeleteFloor', { value: this.selectedFloor.name }).subscribe((res: string) => {
        const dialogData: SimpleDialogData = {
          title: this.selectedFloor.name,
          body: res,
          okButtonColor: 'warn',
          okButtonLabel: this.labelOk,
          cancelButtonLabel: this.labelCancel,
        };

        // Open dialog for user to confirm action.
        const dialogRef = this.dialog.open(SimpleDialogComponent, { data: dialogData });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.requesting = true;
            this.floorService.deleteFloor(this.floorId).subscribe(
              (data: boolean) => {
                if (data) {
                  // Check if there are any other floors left and navigate to the first one
                  const navigateOptions = ['/map', this.locationId];
                  const nextFloor = this.location.floors.find((f: FloorInfo) => f.floorId !== this.floorId);

                  this.requesting = false;
                  this.store.dispatch(this.mapActions.refreshLocationData(this.locationId));

                  if (nextFloor) {
                    navigateOptions.push(nextFloor.floorId);
                  }
                  this.router.navigate(navigateOptions);
                } else {
                  this.showError();
                }
              },
              () => {
                this.showError();
              }
            );
          }
        });
      });
    }
  }

  showError() {
    this.notificationService.showError(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }
}
