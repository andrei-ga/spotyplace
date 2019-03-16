import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { LocationInfo } from '../../../shared/models/location-info';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss'],
})
export class ViewLocationComponent implements OnInit {
  locationId: string;

  floorId: string;

  location: LocationInfo;

  loading = true;

  sidenavOpened = true;

  constructor(private locationService: LocationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.floorId = this.route.snapshot.paramMap.get('floorId');

    this.locationService.getLocation(this.locationId).subscribe(
      (data: LocationInfo) => {
        this.location = data;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
