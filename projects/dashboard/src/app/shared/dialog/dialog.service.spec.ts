import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    const matDialogServiceSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      // imports: [MatDialog],

      providers: [
        DialogService,
        { provide: MatDialog, useValue: matDialogServiceSpy },
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
