import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

type JwtInfo = { sub: string; role: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly jwtInfo = signal<JwtInfo | null>(null);

  httpClient = inject(HttpClient);

  constructor() {
    this.decodeJwt();
  }
  
  logout() {
    localStorage.removeItem('jwt');
    this.jwtInfo.set(null);
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post(`${environment.serverUrl}/login`, credentials, {
        responseType: 'text',
      })
      .pipe(
        tap((jwt) => {
          localStorage.setItem('jwt', jwt);
          this.decodeJwt();
        }),
      );
  }

  decodeJwt() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const jwtParts = jwt.split('.');
      const bodyBase64 = jwtParts[1];
      const bodyJson = atob(bodyBase64);
      const body = JSON.parse(bodyJson);
      this.jwtInfo.set(body);
    }
  }
}
