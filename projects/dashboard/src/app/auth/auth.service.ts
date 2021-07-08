import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface loginResponse {
  success: boolean;
  data: { jwtToken: string };
}

@Injectable({
  providedIn: 'root',
})
// @Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<loginResponse>(`http://${environment.apiUrl}/v0/auth/login`, {
        username,
        password,
      })
      .pipe(map((resData) => resData.data.jwtToken));
  }
}
