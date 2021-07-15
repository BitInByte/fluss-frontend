import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/auth.store';

import { MainNavGroupComponent } from './main-nav-group.component';

describe('MainNavGroupComponent', () => {
  let component: MainNavGroupComponent;
  let fixture: ComponentFixture<MainNavGroupComponent>;

  beforeEach(async () => {
    const authStoreSpy = jasmine.createSpyObj('AuthStore', [
      'logout',
      'token$',
    ]);
    await TestBed.configureTestingModule({
      declarations: [MainNavGroupComponent],
      providers: [{ provide: AuthStore, useValue: authStoreSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
