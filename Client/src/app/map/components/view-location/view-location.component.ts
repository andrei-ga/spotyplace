import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationInfo } from '../../../shared/models/location-info';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { MapActions } from '../../actions/map.actions';
import { getLocationById, getLocationLoaded } from '../../reducers/map-selectors';
import { FloorService } from '../../../shared/services/floor.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss'],
})
export class ViewLocationComponent implements OnInit {
  locationId: string;

  floorId: string;

  location$: Observable<LocationInfo>;

  loaded$: Observable<boolean>;

  sidenavOpened = true;

  creatingFloor = false;

  labelOk$: Observable<string>;

  labelErrorOccurred$: Observable<string>;

  labelCancel$: Observable<string>;

  requesting = false;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<AppState>,
    private mapActions: MapActions,
    private floorService: FloorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.floorId = this.route.snapshot.paramMap.get('floorId');

    this.loadLocation();
    this.location$ = this.store.pipe(select(getLocationById(this.locationId)));
    this.loaded$ = this.store.pipe(select(getLocationLoaded));

    this.labelOk$ = this.translate.get('Ok');
    this.labelErrorOccurred$ = this.translate.get('AnErrorOccurred');
    this.labelCancel$ = this.translate.get('Cancel');
  }

  loadLocation() {
    this.store.dispatch(this.mapActions.getLocationData(this.locationId));
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
      this.requesting = true;
      this.floorService.deleteFloor(this.floorId).subscribe(
        (data: boolean) => {
          this.requesting = false;
          if (data) {
            this.store.dispatch(this.mapActions.deleteLocation(this.locationId));
            this.router.navigate(['/map', this.locationId]);
          }
        },
        () => {
          this.requesting = false;
        }
      );
    }
  }
}
