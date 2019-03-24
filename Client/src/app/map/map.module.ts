import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ViewLocationComponent } from './components/view-location/view-location.component';
import { SharedModule } from '../shared/shared.module';
import { MapActions } from './actions/map.actions';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './effects/map-effects';

const mapEffects = [MapEffects];

@NgModule({
  declarations: [ViewLocationComponent],
  imports: [CommonModule, MapRoutingModule, SharedModule, EffectsModule.forFeature(mapEffects)],
  providers: [MapActions],
})
export class MapModule {}
