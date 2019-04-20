import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { ViewLocationComponent } from './components/view-location/view-location.component';
import { SharedModule } from '../shared/shared.module';
import { MapActions } from './actions/map.actions';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './effects/map-effects';
import { ViewFloorComponent } from './components/view-floor/view-floor.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { UnsavedMarkersGuard } from './components/view-floor/unsaved-markers.guard';
import { MatRadioModule } from '@angular/material';

const mapEffects = [MapEffects];

@NgModule({
  declarations: [ViewLocationComponent, ViewFloorComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    EffectsModule.forFeature(mapEffects),
    LeafletModule,
    LeafletDrawModule,
    MatRadioModule,
  ],
  providers: [MapActions, UnsavedMarkersGuard],
})
export class MapModule {}
