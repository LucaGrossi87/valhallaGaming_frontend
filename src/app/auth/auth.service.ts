import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { User } from '../models/i-users';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Login } from '../models/i-login';
import { LoginResponse } from '../models/i-login-response';

type AccessData = {
  accessToken: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubj = new BehaviorSubject<User | null>(null);

  user$ = this.authSubj.asObservable();
  isLoggedIn$ = this.user$.pipe(
    map((user) => !!user)
  );

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  loginUrl: string = environment.loginUrl;
  logoutUrl: string = environment.logoutUrl;

  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, loginData).pipe(
      tap((response) => {
        const accessData: AccessData = {
          accessToken: response.jwt,
          user: response.admin,
        };
        this.authSubj.next(accessData.user);
        localStorage.setItem('accessData', JSON.stringify(accessData));
        this.autoLogout(accessData.accessToken);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        this.authSubj.next(null);
        localStorage.removeItem('accessData');
        this.router.navigate(['/']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.authSubj.value;
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';
    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
    return accessData.accessToken;
  }

  autoLogout(jwt: string): void {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);

    if (expirationDate) {
      const expiresInMs = expirationDate.getTime() - new Date().getTime();

      setTimeout(() => {
        this.logout();
      }, expiresInMs);
    }
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData');

    if (!userJson) return;
    const accessData: AccessData = JSON.parse(userJson);
    if (accessData.accessToken && accessData.user) {
      this.authSubj.next(accessData.user);
      this.autoLogout(accessData.accessToken);
    }
  }

  errors(err: any) {
    switch (err.error) {
      case 'Email and Password are required':
        return new Error('Email e password obbligatorie');
        break;
      case 'Email already exists':
        return new Error('Utente esistente');
        break;
      case 'Email format is invalid':
        return new Error('Email scritta male');
        break;
      case 'Cannot find user':
        return new Error('utente inesistente');
        break;
      default:
        return new Error('Errore');
        break;
    }
  }
}
