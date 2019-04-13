import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
  translate: TranslateService;

  itemsPerPageLabel = '';

  nextPageLabel = '';

  previousPageLabel = '';

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('ItemsPerPage');
    this.nextPageLabel = this.translate.instant('NextPage');
    this.previousPageLabel = this.translate.instant('PreviousPage');
    this.changes.next();
  }

  getRangeLabel = function(page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return this.translate ? this.translate.instant('pageRangeSingle', { length }) : `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return this.translate
      ? this.translate.instant('PageRangeMultiple', { startIndex, endIndex, length })
      : `${startIndex + 1} - ${endIndex} of ${length}`;
  };
}
