import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LocationActions } from '../../actions/location.actions';
import { LocationInfo } from '../../models/location-info';
import { NotificationService } from '../../services/notification.service';
import { UtilsService } from '../../services/utils.service';

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

  // Edit mode if not null.
  @Input()
  location: LocationInfo;

  @Input()
  isCancelVisible = false;

  @Output()
  cancel = new EventEmitter();

  locationForm: FormGroup;

  requesting = false;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private store: Store<AppState>,
    private locationActions: LocationActions,
    private notificationService: NotificationService
  ) {
    this.locationForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(UtilsService.specialCharactersRegex())],
      ],
      isPublic: [''],
      isSearchable: [''],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.locationForm.reset();
    this.requesting = false;

    if (this.location) {
      this.locationForm.patchValue({
        name: this.location.name,
        isPublic: this.location.isPublic,
        isSearchable: this.location.isSearchable,
      });
    } else {
      this.locationForm.patchValue({
        isPublic: false,
        isSearchable: false,
      });
    }
  }

  showCreateError() {
    this.notificationService.showError(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }

  createLocation() {
    if (this.locationForm.valid) {
      this.requesting = true;
      if (this.location) {
        this.locationService.editLocation(this.location.locationId, this.locationForm.value).subscribe(
          (data: boolean) => {
            if (data) {
              this.initForm();
              this.cancelEdit();
              this.store.dispatch(this.locationActions.getMyLocations());
            } else {
              this.showCreateError();
            }
          },
          () => {
            this.showCreateError();
          }
        );
      } else {
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

  cancelEdit() {
    this.cancel.emit();
  }
}
