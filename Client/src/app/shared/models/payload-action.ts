import { Action } from '@ngrx/store';

export interface PayloadAction<T> extends Action {
  type: string;
  payload?: T;
}
