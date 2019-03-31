import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FloorInfo } from '../../../shared/models/floor-info';
import {
  CRS,
  featureGroup,
  FeatureGroup,
  icon,
  imageOverlay,
  LatLngBounds,
  latLngBounds,
  MapOptions,
  Map,
  polygon,
  marker,
  circle,
  circleMarker,
} from 'leaflet';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material';
import { InputDialogComponent } from '../../../shared/components/input-dialog/input-dialog.component';
import { InputDialogData } from '../../../shared/models/input-dialog-data';
import { MarkerInfo } from '../../../shared/models/marker-info';
import { MarkerService } from '../../../shared/services/marker.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { MapActions } from '../../actions/map.actions';
import { getFloorMarkers } from '../../reducers/map-selectors';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-floor',
  templateUrl: './view-floor.component.html',
  styleUrls: ['./view-floor.component.scss'],
})
export class ViewFloorComponent implements OnInit, OnDestroy {
  @Input()
  floor: FloorInfo;

  @Input()
  canEdit: boolean;

  @Input()
  labelOk: string;

  @Input()
  labelCancel: string;

  @Input()
  labelMarkerDescription: string;

  @Input()
  labelInsertMarkerDescription: string;

  @Output()
  markersUpdated = new EventEmitter<boolean>();

  @Output()
  requesting = new EventEmitter<boolean>();

  @Output()
  errorOccurred = new EventEmitter();

  leafletOptions: MapOptions;

  drawOptions: any;

  featureGroup: FeatureGroup;

  mapBounds: LatLngBounds;

  leafletMap: Map;

  markersSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private markerService: MarkerService,
    private store: Store<AppState>,
    private mapActions: MapActions
  ) {}

  ngOnInit() {
    this.featureGroup = featureGroup();
    this.mapBounds = latLngBounds([0, 0], [this.floor.mapHeight, this.floor.mapWidth]);

    this.leafletOptions = {
      layers: [
        imageOverlay(`${environment.BASE_API_URL}floor/${this.floor.floorId}/image?h=${this.floor.hash}`, this.mapBounds),
        this.featureGroup,
      ],
      zoom: 0,
      maxZoom: 2,
      minZoom: -2,
      crs: CRS.Simple,
      center: this.mapBounds.getCenter(),
    };

    this.drawOptions = {
      position: 'topright',
      draw: {
        marker: {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
          }),
        },
        polyline: false,
      },
      edit: {
        featureGroup: this.featureGroup,
      },
    };
  }

  ngOnDestroy() {
    if (this.markersSubscription) {
      this.markersSubscription.unsubscribe();
    }
  }

  onMapReady(event: Map) {
    this.leafletMap = event;

    this.markersSubscription = this.store
      .pipe(
        select(getFloorMarkers(this.floor.floorId)),
        filter((data: MarkerInfo[]) => data !== null)
      )
      .subscribe((data: MarkerInfo[]) => {
        for (const m of data) {
          const coordinates = m.coordinates.split(',').reduce(function(result, value, index, array) {
            if (index % 2 === 0) {
              result.push(array.slice(index, index + 2).reverse());
            }
            return result;
          }, []);

          if (m.type === 'Polygon') {
            this.featureGroup.addLayer(polygon(coordinates).bindTooltip(m.tooltipContent));
          } else {
            if (m.radius) {
              if (m.radius === 10) {
                this.featureGroup.addLayer(circleMarker(coordinates[0]).bindTooltip(m.tooltipContent));
              } else {
                this.featureGroup.addLayer(circle(coordinates[0], m.radius).bindTooltip(m.tooltipContent));
              }
            } else {
              this.featureGroup.addLayer(marker(coordinates[0]).bindTooltip(m.tooltipContent));
            }
          }
        }
      });
  }

  drawCreated(event) {
    const dialogData: InputDialogData = {
      title: this.labelInsertMarkerDescription,
      body: null,
      inputPlaceholder: this.labelMarkerDescription,
      inputModel: '',
      okButtonColor: 'primary',
      okButtonLabel: this.labelOk,
      cancelButtonLabel: this.labelCancel,
    };

    // Open dialog for user to insert tooltip text
    const dialogRef = this.dialog.open(InputDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.markersUpdated.emit(true);
        event.layer.bindTooltip(result, { sticky: true, offset: [0, 0] });
      } else {
        this.featureGroup.removeLayer(event.layer);
      }
    });
  }

  saveMarkers() {
    const markers: MarkerInfo[] = [];

    this.featureGroup.eachLayer((layer: any) => {
      const geoJsonLayer = layer.toGeoJSON();
      markers.push({
        type: geoJsonLayer.geometry.type,
        coordinates: geoJsonLayer.geometry.coordinates.toString(),
        tooltipContent: layer.getTooltip().getContent(),
        radius: layer.options.radius ? layer.getRadius() : 0,
      });
    });

    this.requesting.emit(true);
    this.markerService.updateMarkers(this.floor.floorId, markers).subscribe(
      (data: boolean) => {
        if (data) {
          this.store.dispatch(this.mapActions.refreshFloorMarkers(this.floor.floorId));
        }
        this.requesting.emit(false);
        this.markersUpdated.emit(false);
      },
      () => {
        this.errorOccurred.emit();
        this.requesting.emit(false);
      }
    );
  }
}
