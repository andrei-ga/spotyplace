import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';
import { LocationInfo } from '../../../shared/models/location-info';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { getLatestLocations } from '../../../shared/reducers/shared-selectors';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('inputSearch')
  inputSearch: ElementRef;

  keyword: string;

  locations: LocationInfo[] = null;

  latestLocations: LocationInfo[] = null;

  searchTimer: any;

  searching = false;

  latestLocationsSubscription: Subscription;

  constructor(private store: Store<AppState>, private locationService: LocationService) {
    this.latestLocationsSubscription = this.store.select(getLatestLocations).subscribe((data: LocationInfo[]) => {
      this.latestLocations = data;
    });
  }

  ngOnInit() {
    if (!UtilsService.isMobile()) {
      this.inputSearch.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    if (this.latestLocationsSubscription) {
      this.latestLocationsSubscription.unsubscribe();
    }
  }

  keywordChanged() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searching = false;
    }

    if (this.keyword && this.keyword.length > 1) {
      this.searching = true;
      this.searchTimer = setTimeout(() => {
        this.locationService.searchLocation(this.keyword).subscribe((data: LocationInfo[]) => {
          this.locations = data;
          this.searching = false;
        });
      }, 300);
    }
  }
}
