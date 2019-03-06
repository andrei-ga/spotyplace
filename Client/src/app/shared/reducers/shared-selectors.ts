import { SharedState } from './shared-state';
import { AppState } from '../../app.reducer';
import { UserInfo } from '../models/user-info';
import { createSelector } from '@ngrx/store';
import { LocationInfo } from '../models/location-info';

export function getSharedState(state: AppState): SharedState {
  return state.shared;
}

function fetchUserInfo(state: SharedState): UserInfo {
  return state.userInfo;
}

export const getUserInfo = createSelector(
  getSharedState,
  fetchUserInfo
);

function fetchMyLocations(state: SharedState): LocationInfo[] {
  return state.myLocations ? state.myLocations.toArray() : [];
}

export const getMyLocations = createSelector(
  getSharedState,
  fetchMyLocations
);
