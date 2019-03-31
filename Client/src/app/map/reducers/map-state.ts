import { LocationInfo } from '../../shared/models/location-info';
import { List, Record } from 'immutable';
import { FloorMarkersInfo } from '../../shared/models/floor-markers-info';

export interface MapState extends Map<string, any> {
  locations: List<LocationInfo>;

  locationLoaded: boolean;

  floorMarkers: List<FloorMarkersInfo>;
}

export const MapStateRecord = Record({
  locations: null,

  locationLoaded: null,

  floorMarkers: List(),
});
