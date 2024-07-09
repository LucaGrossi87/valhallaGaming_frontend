import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('Checking authentication status...');

    return this.authSvc.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        console.log('Is logged in?', isLoggedIn);

        if (!isLoggedIn) {
          console.log('User is not logged in, redirecting...');
          this.router.navigate(['']);
        }
      }),
      map((isLoggedIn) => isLoggedIn) // Ritorna true o false
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
