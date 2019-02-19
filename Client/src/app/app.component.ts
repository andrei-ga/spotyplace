import { Component } from '@angular/core';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import { AccountActions } from './shared/actions/account.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>, private accountActions: AccountActions) {
    this.store.dispatch(this.accountActions.getAccountInfo());
  }
}
