import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorInfo } from '../../models/floor-info';

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

  @Output()
  cancel = new EventEmitter<boolean>();

  floorForm: FormGroup;

  requesting = false;

  constructor(private formBuilder: FormBuilder) {
    this.floorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mapFile: ['', Validators.required],
    });
  }

  ngOnInit() {}

  createFloor() {}

  cancelEdit() {
    this.cancel.emit(true);
  }
}
