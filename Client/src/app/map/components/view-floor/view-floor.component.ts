import { Component, Input, OnInit } from '@angular/core';
import { FloorInfo } from '../../../shared/models/floor-info';
import { CRS, imageOverlay, latLng, LatLngBounds, latLngBounds, MapOptions } from 'leaflet';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-floor',
  templateUrl: './view-floor.component.html',
  styleUrls: ['./view-floor.component.scss'],
})
export class ViewFloorComponent implements OnInit {
  @Input()
  floor: FloorInfo;

  leafletOptions: MapOptions;

  mapBounds: LatLngBounds;

  ngOnInit() {
    this.mapBounds = latLngBounds([0, 0], [this.floor.mapHeight, this.floor.mapWidth]);
    this.leafletOptions = {
      layers: [imageOverlay(`${environment.BASE_API_URL}floor/${this.floor.floorId}/image`, this.mapBounds)],
      zoom: 0,
      maxZoom: 2,
      minZoom: -2,
      crs: CRS.Simple,
      center: this.mapBounds.getCenter(),
    };
  }
}
