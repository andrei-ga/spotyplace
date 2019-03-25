import { PayloadAction } from '../../shared/models/payload-action';
import { Injectable } from '@angular/core';
import { LocationInfo } from '../../shared/models/location-info';

@Injectable()
export class MapActions {
  static GET_LOCATION_DATA = '[Map] - Get Location Data';
  static REFRESH_LOCATION_DATA = '[Map] - Refresh Location Data';
  static STORE_LOCATION_DATA = '[Map] - Store Location Data';

  getLocationData(data: string): PayloadAction<string> {
    return {
      type: MapActions.GET_LOCATION_DATA,
      payload: data,
    };
  }

  refreshLocationData(data: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_LOCATION_DATA,
      payload: data,
    };
  }

  storeLocationData(data: LocationInfo): PayloadAction<LocationInfo> {
    return {
      type: MapActions.STORE_LOCATION_DATA,
      payload: data,
    };
  }
}
