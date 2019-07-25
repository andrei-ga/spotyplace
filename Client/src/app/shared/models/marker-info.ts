import { FloorInfo } from './floor-info';

export class MarkerInfo {
  type: string;

  coordinates: string;

  tooltipContent: string;

  radius: number;

  floor?: FloorInfo;
}
