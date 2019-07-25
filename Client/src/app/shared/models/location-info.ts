import { UserInfo } from './user-info';
import { FloorInfo } from './floor-info';

export class LocationInfo {
  locationId: string;

  ownerId: string;

  name: string;

  isPublic: boolean;

  isSearchable: boolean;

  isPublicToSelected: boolean;

  isSearchableMarkers: boolean;

  publicSelectedGroup: string;

  publicSelectedUsers: UserInfo[];

  owner: UserInfo;

  createdAt: string;

  modifiedAt: string;

  canEdit: boolean;

  floors: FloorInfo[];
}
