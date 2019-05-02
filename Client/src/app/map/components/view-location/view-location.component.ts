import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { ViewFloorComponent } from '../view-floor/view-floor.component';
import { ReportService } from '../../../shared/services/report.service';
import { ReportReason } from '../../../shared/models/report-reason.enum';
import { MarkerInfo } from '../../../shared/models/marker-info';
import { MarkerService } from '../../../shared/services/marker.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss'],
})
export class ViewLocationComponent implements OnInit, OnDestroy {
  @ViewChild(ViewFloorComponent)
  viewFloor: ViewFloorComponent;

  @ViewChild('reportTemplate')
  reportTemplate: TemplateRef<any>;

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

  labelMarkerDescription$: Observable<string>;

  labelInsertMarkerDescription$: Observable<string>;

  requesting = false;

  locationSubscription: Subscription;

  editingFloor = false;

  markersUpdated = false;

  reported = false;

  reportReasons = ReportReason;

  selectedReportReason: number;

  labelReportSend: string;

  foundMarkers: MarkerInfo[] = [];

  markerKeyword: string;

  searchTimer: any;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<AppState>,
    private mapActions: MapActions,
    private floorService: FloorService,
    private notificationService: NotificationService,
    private router: Router,
    private reportService: ReportService,
    private markerService: MarkerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.floorId = params.get('floorId');
      this.locationId = params.get('locationId');
      this.selectedFloor = undefined;
      this.reported = false;
      this.markersUpdated = false;
      if (this.location && this.location.floors.length && this.floorId) {
        setTimeout(() => {
          this.setSelectedFloor();
        }, 200);
      }
    });

    this.loadLocation();
    this.locationSubscription = this.store.pipe(select(getLocationById(this.locationId))).subscribe((data: LocationInfo) => {
      this.location = data;
      if (this.location) {
        if (this.location.floors.length) {
          if (!this.floorId) {
            this.router.navigate(['/map', this.locationId, this.location.floors[0].floorId]);
          } else {
            this.setSelectedFloor();
          }
        } else {
          this.router.navigate(['/map', this.locationId]);
        }
      }
    });

    this.loaded$ = this.store.pipe(select(getLocationLoaded));
    this.labelMarkerDescription$ = this.translate.get('MarkerDescription');
    this.labelInsertMarkerDescription$ = this.translate.get('InsertMarkerDescription');

    this.translate.get('Ok').subscribe((data: string) => {
      this.labelOk = data;
    });
    this.translate.get('Cancel').subscribe((data: string) => {
      this.labelCancel = data;
    });
    this.translate.get('AnErrorOccurred').subscribe((data: string) => {
      this.labelErrorOccurred = data;
    });
    this.translate.get('ReportSend').subscribe((data: string) => {
      this.labelReportSend = data;
    });
  }

  ngOnDestroy() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

  setSelectedFloor() {
    this.store.dispatch(this.mapActions.getFloorMarkers(this.floorId));
    this.selectedFloor = this.location.floors.find((f: FloorInfo) => f.floorId === this.floorId);
  }

  searchMarkers() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.markerService.searchMarkers(this.locationId, this.markerKeyword).subscribe((data: MarkerInfo[]) => {
        this.foundMarkers = data;
      });
    }, 300);
  }

  loadLocation() {
    this.store.dispatch(this.mapActions.getLocationData(this.locationId));
  }

  reloadLocation(floorId: string) {
    this.markersUpdated = false;
    if (floorId) {
      this.store.dispatch(this.mapActions.refreshFloorHash(floorId));
    }
    this.store.dispatch(this.mapActions.refreshLocationData(this.locationId));
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  cancelCreateFloor() {
    this.creatingFloor = false;
    this.editingFloor = false;
  }

  editFloor() {
    this.editingFloor = true;
    this.markersUpdated = false;
  }

  saveMarkers() {
    this.viewFloor.saveMarkers();
  }

  reportFloorPopup() {
    this.dialog.open(this.reportTemplate);
  }

  reportFloor() {
    this.reported = true;
    this.reportService.sendReport(this.selectedReportReason).subscribe((data) => {
      if (data) {
        this.notificationService.showMessage(this.labelReportSend, null, 5000);
      } else {
        this.notificationService.showMessage(this.labelErrorOccurred, this.labelOk, 5000);
      }
      this.dialog.closeAll();
    });
  }

  deleteFloor() {
    if (!this.requesting) {
      const dialogData: SimpleDialogData = {
        title: this.selectedFloor.name,
        body: this.translate.instant('AreYouSureYouWantToDeleteFloor', { value: this.selectedFloor.name }),
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
    }
  }

  showError() {
    this.notificationService.showMessage(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }
}
