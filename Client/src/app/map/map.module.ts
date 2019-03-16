import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ViewLocationComponent } from './components/view-location/view-location.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewLocationComponent],
  imports: [CommonModule, MapRoutingModule, SharedModule],
})
export class MapModule {}
