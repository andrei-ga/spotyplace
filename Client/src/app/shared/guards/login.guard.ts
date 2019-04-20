import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getLoggedIn } from '../reducers/shared-selectors';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(getLoggedIn),
      filter((data) => data !== null),
      map((data: boolean) => {
        if (!data) {
          return true;
        }

        this.router.navigate(['/account']);
        return false;
      })
    );
  }
}
