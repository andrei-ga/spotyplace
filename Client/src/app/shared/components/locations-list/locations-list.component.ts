import { Component, Input } from '@angular/core';
import { LocationInfo } from '../../models/location-info';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from '../../services/location.service';
import { LocationActions } from '../../actions/location.actions';
import { NotificationService } from '../../services/notification.service';
import { MatDialog, PageEvent } from '@angular/material';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { SimpleDialogData } from '../../models/simple-dialog-data';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent {
  @Input()
  locations: LocationInfo[];

  @Input()
  labelOk: string;

  @Input()
  labelErrorOccurred: string;

  @Input()
  labelCancel: string;

  editIndex = -1;

  requesting = false;

  pageSize = 10;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
    private locationActions: LocationActions,
    private locationService: LocationService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  get paginatedLocations(): LocationInfo[] {
    if (!this.locations) {
      return [];
    }

    const minIndex = this.pageSize * (this.pageEvent ? this.pageEvent.pageIndex : 0);
    return this.locations.filter((location, index) => index >= minIndex && index < minIndex + this.pageSize);
  }

  paginatorUpdate(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = event.pageSize;
  }

  editItem(index: number) {
    this.editIndex = index;
  }

  cancelEdit() {
    this.editIndex = -1;
  }

  deleteItem(location: LocationInfo) {
    if (!this.requesting) {
      const dialogData: SimpleDialogData = {
        title: location.name,
        body: this.translate.instant('AreYouSureYouWantToDeleteLocation', { value: location.name }),
        okButtonColor: 'warn',
        okButtonLabel: this.labelOk,
        cancelButtonLabel: this.labelCancel,
      };

      // Open dialog for user to confirm action.
      const dialogRef = this.dialog.open(SimpleDialogComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.requesting = true;
          this.locationService.deleteLocation(location.locationId).subscribe(
            (data) => {
              if (data) {
                this.requesting = false;
                this.store.dispatch(this.locationActions.getMyLocations());
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
