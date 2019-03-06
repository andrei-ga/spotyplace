import { UserInfo } from '../models/user-info';
import { List, Record } from 'immutable';
import { LocationInfo } from '../models/location-info';

export interface SharedState extends Map<string, any> {
  userInfo: UserInfo;

  myLocations: List<LocationInfo>;
}

export const SharedStateRecord = Record({
  userInfo: null,

  myLocations: null,
});
