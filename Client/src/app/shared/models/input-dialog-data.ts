import { SimpleDialogData } from './simple-dialog-data';

export class InputDialogData extends SimpleDialogData {
  inputPlaceholder: string;

  inputModel: string;

  inputPattern: string;

  inputMaxLength: number;

  inputMinLength: number;
}
