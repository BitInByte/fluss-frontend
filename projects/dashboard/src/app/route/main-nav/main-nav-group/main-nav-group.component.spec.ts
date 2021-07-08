import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavGroupComponent } from './main-nav-group.component';

describe('MainNavGroupComponent', () => {
  let component: MainNavGroupComponent;
  let fixture: ComponentFixture<MainNavGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavGroupComponent ]
    })
    .compileComponents();
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
