import { MapState, MapStateRecord } from './map-state';
import { Action } from '@ngrx/store';
import { PayloadAction } from '../../shared/models/payload-action';
import { LocationInfo } from '../../shared/models/location-info';
import { MapActions } from '../actions/map.actions';
import { List } from 'immutable';

const initialState: MapState = (new MapStateRecord() as unknown) as MapState;

export function mapReducer(state: MapState = initialState, action: Action) {
  return {
    locations: locations(state.locations, action),

    locationLoaded: locationLoaded(state.locationLoaded, action),
  };
}

export function locations(state = initialState.locations, action: PayloadAction<any>): List<LocationInfo> {
  switch (action.type) {
    case MapActions.STORE_LOCATION_DATA:
      const location = action.payload as LocationInfo;
      if (location) {
        return state ? state.push(location) : List([location]);
      }
      return state;
    case MapActions.DELETE_LOCATION:
      const locationId = action.payload as string;
      if (locationId && state) {
        return List(state.filter((e: LocationInfo) => e.locationId !== locationId));
      }
      return state;
    default:
      return state;
  }
}

export function locationLoaded(state = initialState.locationLoaded, action: PayloadAction<any>): boolean {
  switch (action.type) {
    case MapActions.GET_LOCATION_DATA:
      return false;
    case MapActions.STORE_LOCATION_DATA:
      return true;
    default:
      return state;
  }
}
