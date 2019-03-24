import { PayloadAction } from '../../shared/models/payload-action';
import { Injectable } from '@angular/core';
import { LocationInfo } from '../../shared/models/location-info';

@Injectable()
export class MapActions {
  static GET_LOCATION_DATA = '[Map] - Get Location Data';
  static STORE_LOCATION_DATA = '[Map] - Store Location Data';
  static DELETE_LOCATION = '[Map] - Delete Location';

  getLocationData(data: string): PayloadAction<string> {
    return {
      type: MapActions.GET_LOCATION_DATA,
      payload: data,
    };
  }

  storeLocationData(data: LocationInfo): PayloadAction<LocationInfo> {
    return {
      type: MapActions.STORE_LOCATION_DATA,
      payload: data,
    };
  }

  deleteLocation(data: string): PayloadAction<string> {
    return {
      type: MapActions.DELETE_LOCATION,
      payload: data,
    };
  }
}
