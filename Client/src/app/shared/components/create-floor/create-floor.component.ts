import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorInfo } from '../../models/floor-info';
import { FileValidator } from 'ngx-material-file-input';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../services/utils.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification.service';
import { FloorService } from '../../services/floor.service';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss'],
})
export class CreateFloorComponent {
  @Input()
  labelOk: string;

  @Input()
  labelErrorOccurred: string;

  // Edit mode if not null.
  @Input()
  floor: FloorInfo;

  @Input()
  isCancelVisible = false;

  @Input()
  locationId: string;

  @Output()
  cancel = new EventEmitter();

  @Output()
  floorCreated = new EventEmitter();

  floorForm: FormGroup;

  requesting = false;

  previewImage: SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer,
    private floorService: FloorService,
    private notificationService: NotificationService
  ) {
    this.floorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mapFile: ['', [Validators.required, FileValidator.maxContentSize(environment.MAP_UPLOAD_MAX_FILE_SIZE)]],
    });

    this.floorForm.get('mapFile').valueChanges.subscribe((value) => {
      if (value && value.files) {
        this.utilsService.getBase64(value.files[0]).subscribe((image: string) => {
          this.previewImage = this.sanitizer.bypassSecurityTrustResourceUrl(image);
        });
      } else {
        this.previewImage = undefined;
      }
    });
  }

  createFloor() {
    if (this.floorForm.valid) {
      this.requesting = true;
      this.floorService
        .createFloor(this.locationId, this.floorForm.get('name').value, this.floorForm.get('mapFile').value.files[0])
        .subscribe(
          (data: boolean) => {
            if (data) {
              this.floorCreated.emit();
              this.cancelEdit();
            } else {
              this.showCreateError();
            }
          },
          () => {
            this.showCreateError();
          }
        );
    }
  }

  cancelEdit() {
    this.cancel.emit();
  }

  showCreateError() {
    this.notificationService.showError(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }
}
