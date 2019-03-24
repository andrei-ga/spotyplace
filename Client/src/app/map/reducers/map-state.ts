import { LocationInfo } from '../../shared/models/location-info';
import { List, Record } from 'immutable';

export interface MapState extends Map<string, any> {
  locations: List<LocationInfo>;

  locationLoaded: boolean;
}

export const MapStateRecord = Record({
  locations: null,

  locationLoaded: null,
});
