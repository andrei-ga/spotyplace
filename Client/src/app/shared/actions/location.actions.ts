import { Action } from '@ngrx/store';
import { LocationInfo } from '../models/location-info';
import { PayloadAction } from '../models/payload-action';

export class LocationActions {
  static GET_MY_LOCATIONS = '[Shared] - Get My Locations';
  static STORE_MY_LOCATIONS = '[Shared] - Store My Locations';
  static GET_LATEST_LOCATIONS = '[Shared] - Get Latest Locations';
  static STORE_LATEST_LOCATIONS = '[Shared] - Store Latest Locations';

  getMyLocations(): Action {
    return {
      type: LocationActions.GET_MY_LOCATIONS,
    };
  }

  storeMyLocations(data: LocationInfo[]): PayloadAction<LocationInfo[]> {
    return {
      type: LocationActions.STORE_MY_LOCATIONS,
      payload: data,
    };
  }

  getLatestLocations(): Action {
    return {
      type: LocationActions.GET_LATEST_LOCATIONS,
    };
  }

  storeLatestLocations(data: LocationInfo[]): PayloadAction<LocationInfo[]> {
    return {
      type: LocationActions.STORE_LATEST_LOCATIONS,
      payload: data,
    };
  }
}
