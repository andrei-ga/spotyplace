import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';
import { LocationInfo } from '../../../shared/models/location-info';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('inputSearch')
  inputSearch: ElementRef;

  keyword: string;

  locations: LocationInfo[] = null;

  searchTimer: any;

  searching = false;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.inputSearch.nativeElement.focus();
  }

  keywordChanged() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searching = false;
    }

    if (this.keyword && this.keyword.length > 2) {
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
