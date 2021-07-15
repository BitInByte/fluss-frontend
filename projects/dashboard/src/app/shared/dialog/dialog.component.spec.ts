import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    const dialogRefServiceSpy = jasmine.createSpyObj('MatDialogClose', [
      'close',
    ]);
    const matDialogDataSpy = jasmine.createSpyObj('MatDialogData', ['data']);
    await TestBed.configureTestingModule({
      // imports: [MatDialogModule],
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
