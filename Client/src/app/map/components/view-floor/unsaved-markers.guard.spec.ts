import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedMarkersGuard } from './unsaved-markers.guard';

describe('UnsavedMarkersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedMarkersGuard]
    });
  });

  it('should ...', inject([UnsavedMarkersGuard], (guard: UnsavedMarkersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
