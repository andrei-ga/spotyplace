import { SharedState } from './shared/reducers/shared-state';
import { sharedReducer } from './shared/reducers/shared-reducer';
import { MapState } from './map/reducers/map-state';
import { mapReducer } from './map/reducers/map-reducer';
import { AccountState } from './account/reducers/account-state';
import { accountReducer } from './account/reducers/account-reducer';

export interface AppState {
  shared: SharedState;

  map: MapState;

  account: AccountState;
}

export const reducers = {
  shared: sharedReducer,

  map: mapReducer,

  account: accountReducer,
};
