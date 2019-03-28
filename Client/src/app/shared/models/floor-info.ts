import { LocationInfo } from './location-info';

export class FloorInfo {
  floorId: string;

  locationId: string;

  name: string;

  location: LocationInfo;

  isSvg: boolean;

  mapWidth: number;

  mapHeight: number;

  createdAt: string;

  modifiedAt: string;

  hash: string;
}
