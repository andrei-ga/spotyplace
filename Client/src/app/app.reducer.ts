import { SharedState } from './shared/reducers/shared-state';
import { sharedReducer } from './shared/reducers/shared-reducer';

export interface AppState {
  shared: SharedState;
}

export const reducers = {
  shared: sharedReducer,
};
