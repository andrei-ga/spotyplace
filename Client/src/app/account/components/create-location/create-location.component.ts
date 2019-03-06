import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../shared/services/location.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LocationActions } from '../../../shared/actions/location.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss'],
})
export class CreateLocationComponent implements OnInit {
  @Input()
  labelOk: string;

  @Input()
  labelErrorOccurred: string;

  locationForm: FormGroup;

  locationRequest = false;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private store: Store<AppState>,
    private locationActions: LocationActions,
    private snackBar: MatSnackBar
  ) {
    this.locationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      isPublic: [''],
      isSearchable: [''],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.locationForm.reset();
    this.locationRequest = false;
    this.locationForm.patchValue({
      isPublic: false,
      isSearchable: false,
    });
  }

  showCreateError() {
    this.snackBar.open(this.labelErrorOccurred, this.labelOk, {
      duration: 5000,
    });
    this.initForm();
  }

  createLocation() {
    if (this.locationForm.valid) {
      this.locationRequest = true;
      this.locationService.createLocation(this.locationForm.value).subscribe(
        (data) => {
          if (data) {
            this.initForm();
            this.store.dispatch(this.locationActions.getMyLocations());
          }
        },
        () => {
          this.showCreateError();
        }
      );
    }
  }
}
