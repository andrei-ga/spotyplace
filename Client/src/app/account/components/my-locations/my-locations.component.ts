import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationInfo } from '../../../shared/models/location-info';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { getMyLocations } from '../../../shared/reducers/shared-selectors';

@Component({
  selector: 'app-my-locations',
  templateUrl: './my-locations.component.html',
  styleUrls: ['./my-locations.component.scss'],
})
export class MyLocationsComponent implements OnInit {
  myLocations$: Observable<LocationInfo[]>;

  labelOk$: Observable<string>;

  labelErrorOccurred$: Observable<string>;

  labelCancel$: Observable<string>;

  constructor(private store: Store<AppState>, private translate: TranslateService) {}

  ngOnInit() {
    this.myLocations$ = this.store.select(getMyLocations);
    this.labelOk$ = this.translate.get('Ok');
    this.labelErrorOccurred$ = this.translate.get('AnErrorOccurred');
    this.labelCancel$ = this.translate.get('Cancel');
  }
}
