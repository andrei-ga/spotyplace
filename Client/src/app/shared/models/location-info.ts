import { UserInfo } from './user-info';

export class LocationInfo {
  locationId: string;

  ownerId: string;

  name: string;

  isPublic: boolean;

  isSearchable: boolean;

  owner: UserInfo;
}
