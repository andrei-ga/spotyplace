import { UserInfo } from './user-info';
import { FloorInfo } from './floor-info';

export class LocationInfo {
  locationId: string;

  ownerId: string;

  name: string;

  isPublic: boolean;

  isSearchable: boolean;

  owner: UserInfo;

  createdAt: string;

  modifiedAt: string;

  floors: FloorInfo[];
}
