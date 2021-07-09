import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, shareReplay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoadingService } from '../shared/loading/loading.service';

interface loginResponse {
  success: boolean;
  data: { jwtToken: string };
}

@Injectable({
  providedIn: 'root',
})
// @Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  login(username: string, password: string): Observable<string> {
    this.loadingService.setLoadingOn();
    return this.http
      .post<loginResponse>(`http://${environment.apiUrl}/v0/auth/login`, {
        username,
        password,
      })
      .pipe(
        take(1),
        map((resData) => resData.data.jwtToken),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }
}
