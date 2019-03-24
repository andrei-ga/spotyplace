import { AppState } from '../../app.reducer';
import { MapState } from './map-state';
import { createSelector } from '@ngrx/store';
import { LocationInfo } from '../../shared/models/location-info';

export function getMapState(state: AppState): MapState {
  return state.map;
}

export const getLocationById = (id: string) =>
  createSelector(
    getMapState,
    (state: MapState) => (!state || !state.locations ? null : state.locations.find((e: LocationInfo) => e.locationId === id))
  );

function fetchLocationLoaded(state: MapState): boolean {
  return state.locationLoaded;
}

export const getLocationLoaded = createSelector(
  getMapState,
  fetchLocationLoaded
);
