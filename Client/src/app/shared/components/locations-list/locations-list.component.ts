import { Component, Input } from '@angular/core';
import { LocationInfo } from '../../models/location-info';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent {
  @Input()
  locations: LocationInfo[];
}
