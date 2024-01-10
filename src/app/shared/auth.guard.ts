import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      window.alert('Access not allowed!');
      this.router.navigate(['login']);
    }
    const currentUser: User | undefined = this.authService.currentUserValue;
    if (
      route.data['roles'] &&
      currentUser &&
      currentUser.roles.filter((role) => route.data['roles'].includes(role))
        .length < 1
    ) {
      // role not authorised so redirect to home page
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
