import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { getLoggedIn } from '../reducers/shared-selectors';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(getLoggedIn),
      filter((data) => data !== null),
      map((data: boolean) => {
        if (data) {
          return true;
        }

        window.location.href = `${environment.BASE_API_URL}account/login`;
        return false;
      })
    );
  }
}
