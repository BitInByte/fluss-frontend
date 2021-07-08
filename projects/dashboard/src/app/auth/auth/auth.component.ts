import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    console.log(form);
    this.authStore.login(
      form.controls['username'].value,
      form.controls['password'].value
    );
  }
}
