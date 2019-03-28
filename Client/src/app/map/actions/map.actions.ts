import { PayloadAction } from '../../shared/models/payload-action';
import { Injectable } from '@angular/core';
import { LocationInfo } from '../../shared/models/location-info';

@Injectable()
export class MapActions {
  static GET_LOCATION_DATA = '[Map] - Get Location Data';
  static REFRESH_LOCATION_DATA = '[Map] - Refresh Location Data';
  static STORE_LOCATION_DATA = '[Map] - Store Location Data';
  static REFRESH_FLOOR_HASH = '[Map] - Refresh Floor Hash';

  getLocationData(id: string): PayloadAction<string> {
    return {
      type: MapActions.GET_LOCATION_DATA,
      payload: id,
    };
  }

  refreshLocationData(id: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_LOCATION_DATA,
      payload: id,
    };
  }

  storeLocationData(data: LocationInfo): PayloadAction<LocationInfo> {
    return {
      type: MapActions.STORE_LOCATION_DATA,
      payload: data,
    };
  }

  refreshFloorHash(id: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_FLOOR_HASH,
      payload: id,
    };
  }
}
