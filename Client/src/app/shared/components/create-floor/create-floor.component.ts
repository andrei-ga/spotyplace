import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloorInfo } from '../../models/floor-info';
import { FileValidator } from 'ngx-material-file-input';
import { UtilsService } from '../../services/utils.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification.service';
import { FloorService } from '../../services/floor.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.scss'],
})
export class CreateFloorComponent implements OnInit {
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

  mapUploadMaxFileSize: number;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer,
    private floorService: FloorService,
    private notificationService: NotificationService,
    private appConfigService: AppConfigService
  ) {
    this.mapUploadMaxFileSize = this.appConfigService.getConfig().MAP_UPLOAD_MAX_FILE_SIZE;
    this.floorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  ngOnInit() {
    if (this.floor) {
      this.floorForm.patchValue({
        name: this.floor.name,
      });
      this.floorForm.addControl('mapFile', new FormControl('', [FileValidator.maxContentSize(this.mapUploadMaxFileSize)]));
    } else {
      this.floorForm.addControl(
        'mapFile',
        new FormControl('', [Validators.required, FileValidator.maxContentSize(this.mapUploadMaxFileSize)])
      );
    }

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
    if (this.floorForm.valid && !this.requesting) {
      this.requesting = true;
      if (this.floor) {
        this.floorService
          .editFloor(
            this.floor.floorId,
            this.floorForm.get('name').value,
            this.floorForm.get('mapFile').value.files ? this.floorForm.get('mapFile').value.files[0] : null
          )
          .subscribe(
            (data: boolean) => {
              if (data) {
                this.floorCreated.emit();
                this.cancelEdit();
              } else {
                this.showError();
              }
            },
            () => {
              this.showError();
            }
          );
      } else {
        this.floorService
          .createFloor(this.locationId, this.floorForm.get('name').value, this.floorForm.get('mapFile').value.files[0])
          .subscribe(
            (data: boolean) => {
              if (data) {
                this.floorCreated.emit();
                this.cancelEdit();
              } else {
                this.showError();
              }
            },
            () => {
              this.showError();
            }
          );
      }
    }
  }

  cancelEdit() {
    this.cancel.emit();
  }

  showError() {
    this.notificationService.showError(this.labelErrorOccurred, this.labelOk, 5000);
    setTimeout(() => {
      this.requesting = false;
    }, 3000);
  }
}
