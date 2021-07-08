import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface loginResponse {
  success: boolean;
  data: { jwtToken: string };
}

// @Injectable({
// providedIn: 'root',
// })
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<loginResponse> {
    return this.http
      .post<loginResponse>(`http://${environment.apiUrl}/v0/auth/login`, {
        username,
        password,
      })
      .pipe(shareReplay());
    // .subscribe((response) => console.log(response));
  }
}
