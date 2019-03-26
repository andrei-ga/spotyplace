import { Component, Input, OnInit } from '@angular/core';
import { FloorInfo } from '../../../shared/models/floor-info';
import { imageOverlay, latLng, MapOptions } from 'leaflet';
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

  ngOnInit() {
    this.leafletOptions = {
      layers: [imageOverlay(`${environment.BASE_API_URL}floor/${this.floor.floorId}/image`, [[0, 0], [1000, 1000]])],
      zoom: 1,
      maxZoom: 3,
      minZoom: -1,
      center: latLng(0, 0),
    };
  }
}
