import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocationService } from '../services/location.service';
import { LocationActions } from '../actions/location.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { LocationInfo } from '../models/location-info';

@Injectable()
export class LocationEffects {
  constructor(private actions$: Actions, private locationService: LocationService, private locationActions: LocationActions) {}

  @Effect()
  getMyLocations: Observable<Action> = this.actions$.pipe(
    ofType(LocationActions.GET_MY_LOCATIONS),
    switchMap(() => this.locationService.getMyLocations()),
    map((data: LocationInfo[]) => this.locationActions.storeMyLocations(data))
  );

  @Effect()
  getLatestLocations: Observable<Action> = this.actions$.pipe(
    ofType(LocationActions.GET_LATEST_LOCATIONS),
    switchMap(() => this.locationService.getLatestLocations()),
    map((data: LocationInfo[]) => this.locationActions.storeLatestLocations(data))
  );
}
