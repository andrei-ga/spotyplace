import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewLocationComponent } from './components/view-location/view-location.component';
import { UnsavedMarkersGuard } from './components/view-floor/unsaved-markers.guard';

const routes: Routes = [
  {
    path: ':locationId',
    component: ViewLocationComponent,
  },
  {
    path: ':locationId/:floorId',
    component: ViewLocationComponent,
    canDeactivate: [UnsavedMarkersGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
