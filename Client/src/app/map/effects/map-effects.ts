import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MapActions } from '../actions/map.actions';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { LocationService } from '../../shared/services/location.service';
import { LocationInfo } from '../../shared/models/location-info';
import { PayloadAction } from '../../shared/models/payload-action';
import { AppState } from '../../app.reducer';

@Injectable()
export class MapEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private locationService: LocationService,
    private mapActions: MapActions
  ) {}

  @Effect()
  getLocationById: Observable<Action> = this.actions$.pipe(
    ofType(MapActions.GET_LOCATION_DATA),
    withLatestFrom(this.store),
    filter(
      ([action, state]: [PayloadAction<string>, AppState]) =>
        !!action.payload &&
        !(state.map && state.map.locations && state.map.locations.findIndex((e: LocationInfo) => e.locationId === action.payload) !== -1)
    ),
    mergeMap(([action, state]: [PayloadAction<string>, AppState]) => this.locationService.getLocation(action.payload)),
    map((data: LocationInfo) => this.mapActions.storeLocationData(data))
  );
}
