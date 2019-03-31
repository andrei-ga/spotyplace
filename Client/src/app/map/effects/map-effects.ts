import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MapActions } from '../actions/map.actions';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { LocationService } from '../../shared/services/location.service';
import { LocationInfo } from '../../shared/models/location-info';
import { PayloadAction } from '../../shared/models/payload-action';
import { AppState } from '../../app.reducer';
import { MarkerService } from '../../shared/services/marker.service';
import { of } from 'rxjs/internal/observable/of';
import { MarkerInfo } from '../../shared/models/marker-info';
import { zip } from 'rxjs/internal/observable/zip';
import { FloorMarkersInfo } from '../../shared/models/floor-markers-info';

@Injectable()
export class MapEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private locationService: LocationService,
    private markerService: MarkerService,
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

  @Effect()
  refreshLocationById: Observable<Action> = this.actions$.pipe(
    ofType(MapActions.REFRESH_LOCATION_DATA),
    mergeMap((action: PayloadAction<string>) => this.locationService.getLocation(action.payload)),
    map((data: LocationInfo) => this.mapActions.storeLocationData(data))
  );

  @Effect()
  getFloorMarkers: Observable<Action> = this.actions$.pipe(
    ofType(MapActions.GET_FLOOR_MARKERS),
    withLatestFrom(this.store),
    filter(
      ([action, state]: [PayloadAction<string>, AppState]) =>
        !!action.payload &&
        !(
          state.map &&
          state.map.floorMarkers &&
          state.map.floorMarkers.findIndex((e: FloorMarkersInfo) => e.floorId === action.payload) !== -1
        )
    ),
    mergeMap(([action, state]: [PayloadAction<string>, AppState]) =>
      zip(of(action.payload), this.markerService.getMarkers(action.payload))
    ),
    map(([floorId, markers]: [string, MarkerInfo[]]) => this.mapActions.storeFloorMarkers({ floorId: floorId, markers: markers }))
  );
}
