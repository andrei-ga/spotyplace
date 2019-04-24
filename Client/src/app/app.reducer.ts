import { SharedState } from './shared/reducers/shared-state';
import { sharedReducer } from './shared/reducers/shared-reducer';
import { MapState } from './map/reducers/map-state';
import { mapReducer } from './map/reducers/map-reducer';

export interface AppState {
  shared: SharedState;

  map: MapState;
}

export const reducers = {
  shared: sharedReducer,

  map: mapReducer,
};
