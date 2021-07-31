import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../shared/loading/loading.service';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm', { static: false }) authForm: NgForm;
  constructor(
    private authStore: AuthStore,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    console.log(form);
    if (form.valid) {
      this.authStore.login(
        form.controls['username'].value,
        form.controls['password'].value
      );
    }
  }
}
