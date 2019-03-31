import { PayloadAction } from '../../shared/models/payload-action';
import { Injectable } from '@angular/core';
import { LocationInfo } from '../../shared/models/location-info';
import { FloorMarkersInfo } from '../../shared/models/floor-markers-info';

@Injectable()
export class MapActions {
  static GET_LOCATION_DATA = '[Map] - Get Location Data';
  static REFRESH_LOCATION_DATA = '[Map] - Refresh Location Data';
  static STORE_LOCATION_DATA = '[Map] - Store Location Data';
  static REFRESH_FLOOR_HASH = '[Map] - Refresh Floor Hash';
  static GET_FLOOR_MARKERS = '[Map] - Get Floors Markers';
  static STORE_FLOOR_MARKERS = '[Map] - Store Floor Markers';
  static REFRESH_FLOOR_MARKERS = '[Map] - Refresh Floor Markers';

  getLocationData(locationId: string): PayloadAction<string> {
    return {
      type: MapActions.GET_LOCATION_DATA,
      payload: locationId,
    };
  }

  refreshLocationData(locationId: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_LOCATION_DATA,
      payload: locationId,
    };
  }

  storeLocationData(data: LocationInfo): PayloadAction<LocationInfo> {
    return {
      type: MapActions.STORE_LOCATION_DATA,
      payload: data,
    };
  }

  refreshFloorHash(floorId: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_FLOOR_HASH,
      payload: floorId,
    };
  }

  getFloorMarkers(floorId: string): PayloadAction<string> {
    return {
      type: MapActions.GET_FLOOR_MARKERS,
      payload: floorId,
    };
  }

  storeFloorMarkers(data: FloorMarkersInfo): PayloadAction<FloorMarkersInfo> {
    return {
      type: MapActions.STORE_FLOOR_MARKERS,
      payload: data,
    };
  }

  refreshFloorMarkers(floorId: string): PayloadAction<string> {
    return {
      type: MapActions.REFRESH_FLOOR_MARKERS,
      payload: floorId,
    };
  }
}
