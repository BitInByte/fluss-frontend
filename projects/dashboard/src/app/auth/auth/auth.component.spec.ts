import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { async, Observable, of } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { AuthStore } from '../auth.store';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loadingServiceSpy: {
    loading$: Observable<boolean>;
    setLoadingOff: jasmine.Spy;
  };

  beforeEach(async () => {
    const authStoreSpy = jasmine.createSpyObj('AuthStore', ['login']);
    loadingServiceSpy = jasmine.createSpyObj(
      // Service
      'LoadingService',
      // Methods
      [],
      // Properties
      ['loading$']
    );
    // loadingServiceSpy = { loading$: of(false) };

    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule, CommonModule],
      providers: [
        { provide: AuthStore, useValue: authStoreSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should be created', () => {
    expect(component).toBeTruthy();
  });

  it('#should contain a form', () => {
    const formElement = fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
  });
});
