import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
  async,
} from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { AuthStore } from '../auth.store';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authStoreSpy: { login: jasmine.Spy };
  // let loadingServiceSpy: {
  // loading$: Observable<boolean>;
  // setLoadingOff: jasmine.Spy;
  // };
  // let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  const loadingSub = new BehaviorSubject<boolean>(false);
  let loadingServiceSpy: { loading$: BehaviorSubject<boolean> };
  let button: HTMLButtonElement;
  let authForm: NgForm;

  beforeEach(async () => {
    // const authStoreSpy = jasmine.createSpyObj('AuthStore', ['login']);
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['login']);
    loadingServiceSpy = jasmine.createSpyObj(
      // Service
      'LoadingService',
      // Methods
      [],
      // Properties
      // ['loading$']
      { loading$: loadingSub }
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
    // fixture = TestBed.createComponent(AuthComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    // // Get the button element
    // button = fixture.nativeElement.querySelector(
    // 'button[type="submit"]'
    // ) as HTMLButtonElement;
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Get the button element
    button = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    authForm = component.authForm;
  });

  afterEach(() => {
    loadingServiceSpy.loading$.next(false);
    authForm.resetForm();
    fixture.detectChanges();
  });

  it('#should be created', () => {
    expect(component).toBeTruthy();
  });

  it('#should contain a form', () => {
    const formElement = fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy('Expected Form');
  });

  it('#should have a button with type submit', () => {
    // Check if the button exists
    expect(button).toBeTruthy('Expected Button Type Submit');
  });

  it('#should disable submit button if loading is on', () => {
    // loadingServiceSpy.setLoadingOn();

    // Set loading to true
    // loadingServiceSpy.loading$ = of(true);
    loadingServiceSpy.loading$.next(true);

    // tick();

    // Apply changes
    fixture.detectChanges();

    // console.log(button.disabled);

    // Check if button is disabled
    expect(button.disabled).toBeTrue();
  });

  it(
    '#form should be invalid at the component start',
    waitForAsync(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        // Get elements
        // const componentValidation = component.authForm.valid;
        const componentValidation = authForm.valid;
        // const usernameControl = component.authForm.controls['username'];
        // const passwordControl = component.authForm.controls['password'];
        authForm.controls['username'];
        authForm.controls['password'];

        // Get validations before setting inputs
        expect(componentValidation).toBeFalsy('Expected to be false');
        expect(button.disabled).toBeTruthy('Expected to be true');
      });
    })
  );

  // Need to be async because template driven forms takes more time
  it(
    '#should disable submit button if form is valid',
    waitForAsync(() => {
      // Template is completed later, so, we need to wait
      // until template got completed all tasks
      fixture.whenStable().then(() => {
        console.log('Loading: ', loadingServiceSpy.loading$.getValue());

        // Detect changes after being stable
        fixture.detectChanges();

        // Get elements
        // const componentValidation = component.authForm.valid;
        // const componentValidation = authForm.valid;
        authForm.valid;
        // const usernameControl = component.authForm.controls['username'];
        const usernameControl = authForm.controls['username'];
        // const passwordControl = component.authForm.controls['password'];
        const passwordControl = authForm.controls['password'];
        // const newButton = fixture.debugElement.query(By.css('button'))
        // .nativeElement as HTMLButtonElement;
        // console.log('Button REffffff\n\n', button);
        // console.log('Button Refffff\n\n', button.disabled);

        // Get validations before setting inputs
        // expect(componentValidation).toBeFalsy('Expected to be false');
        // expect(button.disabled).toBeTruthy('Expected to be true');
        // expect(newButton.disabled).toBe(true);

        // Setting inputs
        usernameControl.setValue('someUsername');
        passwordControl.setValue('somePassword');

        // Detect changes
        fixture.detectChanges();

        // Get validations after settings inputs
        expect(component.authForm.valid).toBeTruthy('Expected to be true');
        // console.log('Button REffffff\n\n', button);
        // console.log('Button Refffffff2\n\n', button.disabled);
        // expect(newButton.disabled).toBeFalsy();
        expect(button.disabled).toBeFalsy('Expected to be false');
      });
    })
  );

  it('#should password be valid if user enter password with 9 characters', () => {
    // waitForAsync(() => {
    // fixture.whenStable().then(() => {
    // Detect changes after component finish the queue // ngOnInit
    // fixture.detectChanges();

    // Get the password control
    // const passwordControl = component.authForm.controls['password'];
    const passwordControl = authForm.controls['password'];

    // Set invalid password
    passwordControl.setValue('12345678');

    expect(passwordControl.valid).toBeFalsy('Expect to be false');

    // Set valid password
    passwordControl.setValue('123456789');

    expect(passwordControl.valid).toBeTruthy('Expect to be true');
    // });
  });
  // );

  it('#should username be valid if user enter username on the input', () => {
    // fixture.whenStable().then(() => {
    // Detect changes after component finish the queue // ngOnInit
    // fixture.detectChanges();

    // Get the password control
    // const usernameControl = component.authForm.controls['username'];
    const usernameControl = authForm.controls['username'];

    // Set valid password
    usernameControl.setValue('someUsername');

    expect(usernameControl.valid).toBeTruthy('Expect to be true');
    // });
  });

  it('#should submit form if form is valid', () => {
    const usernameControl = authForm.controls['username'];
    const passwordControl = authForm.controls['password'];

    usernameControl.setValue('someUsername');
    passwordControl.setValue('somePassword');

    component.onSubmit(authForm);

    // expect(authStoreSpy.login).toHaveBeenCalledTimes(2);
    expect(authStoreSpy.login).toHaveBeenCalled();
  });
});
