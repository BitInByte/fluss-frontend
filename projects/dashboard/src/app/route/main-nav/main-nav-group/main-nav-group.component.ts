import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../../auth/auth.store';

@Component({
  selector: 'app-main-nav-group',
  templateUrl: './main-nav-group.component.html',
  styleUrls: ['./main-nav-group.component.scss'],
})
export class MainNavGroupComponent implements OnInit {
  constructor(public authStore: AuthStore) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authStore.logout();
  }
}
