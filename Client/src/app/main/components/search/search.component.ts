import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocationInfo } from '../../../shared/models/location-info';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LocationService } from '../../../shared/services/location.service';
import { getLatestLocations } from '../../../shared/reducers/shared-selectors';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
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
