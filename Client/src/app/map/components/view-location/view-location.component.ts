import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { LocationInfo } from '../../../shared/models/location-info';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

  creatingFloor = false;

  labelOk$: Observable<string>;

  labelErrorOccurred$: Observable<string>;

  labelCancel$: Observable<string>;

  constructor(private locationService: LocationService, private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit() {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.floorId = this.route.snapshot.paramMap.get('floorId');

    this.labelOk$ = this.translate.get('Ok');
    this.labelErrorOccurred$ = this.translate.get('AnErrorOccurred');
    this.labelCancel$ = this.translate.get('Cancel');

    this.loadLocation();
  }

  loadLocation() {
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

  cancelCreateFloor() {
    this.creatingFloor = false;
  }
}
