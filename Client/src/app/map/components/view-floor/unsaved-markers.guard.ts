import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogData } from '../../../shared/models/simple-dialog-data';
import { SimpleDialogComponent } from '../../../shared/components/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewLocationComponent } from '../view-location/view-location.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedMarkersGuard implements CanDeactivate<ViewLocationComponent> {
  constructor(private translate: TranslateService, private dialog: MatDialog) {}

  canDeactivate(component: ViewLocationComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.markersUpdated) {
      const dialogData: SimpleDialogData = {
        title: '',
        body: this.translate.instant('UpdateMarkersReminder'),
        okButtonColor: 'warn',
        okButtonLabel: this.translate.instant('Ok'),
        cancelButtonLabel: this.translate.instant('Cancel'),
      };

      const dialogRef = this.dialog.open(SimpleDialogComponent, { data: dialogData });
      return dialogRef.afterClosed().pipe(
        map((result) => {
          return result;
        })
      );
    }
    return true;
  }
}
