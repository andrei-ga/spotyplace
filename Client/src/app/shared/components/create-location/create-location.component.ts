import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LocationActions } from '../../actions/location.actions';
import { LocationInfo } from '../../models/location-info';
import { NotificationService } from '../../services/notification.service';
import { UtilsService } from '../../services/utils.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { getUserInfo } from '../../reducers/shared-selectors';
import { UserLevelEnum } from '../../models/user-level-enum';
import { AccountService } from '../../services/account.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

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

  @ViewChild('searchUserInput')
  searchUserInput: ElementRef<HTMLInputElement>;

  locationForm: FormGroup;

  requesting = false;

  userInfo: UserInfo;

  userLevelEnum = UserLevelEnum;

  selectedUsernames: UserInfo[] = [];

  searchUsernames$: Observable<UserInfo[]>;

  searchTimer: any;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private store: Store<AppState>,
    private locationActions: LocationActions,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
    this.locationForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(UtilsService.specialCharactersRegex())],
      ],
      isPublic: [''],
      isSearchable: [''],
      isPublicToSelected: [''],
      userKeyword: [''],
      publicSelectedUsers: [''],
    });
  }

  ngOnInit() {
    this.initForm();
    this.store.select(getUserInfo).subscribe((data: UserInfo) => {
      this.userInfo = data;
      if (data.userLevel === UserLevelEnum.free) {
        this.locationForm.get('isPublicToSelected').disable();
      }
    });
  }

  searchUsers() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.searchUsernames$ = this.accountService.searchUsers(this.locationForm.get('userKeyword').value);
    }, 300);
  }

  selectUser(event: MatAutocompleteSelectedEvent) {
    if (this.selectedUsernames.findIndex((e) => e.email === event.option.value.email) === -1) {
      this.selectedUsernames.push(event.option.value);
      this.locationForm.markAsDirty();
    }
    this.locationForm.patchValue({ userKeyword: null });
    this.searchUserInput.nativeElement.value = '';
  }

  removeUser(user: UserInfo) {
    const index = this.selectedUsernames.indexOf(user);
    if (index !== -1) {
      this.selectedUsernames.splice(index, 1);
      this.locationForm.markAsDirty();
    }
  }

  initForm() {
    this.locationForm.reset();
    this.requesting = false;
    this.selectedUsernames = [];

    if (this.location) {
      this.locationForm.patchValue({
        name: this.location.name,
        isPublic: this.location.isPublic,
        isSearchable: this.location.isSearchable,
        isPublicToSelected: this.location.isPublicToSelected,
      });
      this.selectedUsernames = [...this.location.publicSelectedUsers];
    } else {
      this.locationForm.patchValue({
        isPublic: false,
        isSearchable: false,
        isPublicToSelected: false,
      });
    }
  }

  showCreateError() {
    this.notificationService.showMessage(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }

  createLocation() {
    if (this.locationForm.valid) {
      this.requesting = true;
      this.locationForm.patchValue({ publicSelectedUsers: this.selectedUsernames });
      if (this.location) {
        this.locationService.editLocation(this.location.locationId, this.locationForm.value).subscribe(
          (data: boolean) => {
            if (data) {
              this.initForm();
              this.cancelEdit();
              this.store.dispatch(this.locationActions.getMyLocations());
              this.store.dispatch(this.locationActions.getLatestLocations());
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
              this.store.dispatch(this.locationActions.getLatestLocations());
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
