import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { User } from './user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from './role';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(
      currentUser ? JSON.parse(currentUser) : null,
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | undefined {
    return this.currentUserSubject?.value;
  }
  // Sign-up
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp(user: LoginRequest): Observable<any> {
    const api = `${environment.apiURL}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: LoginRequest) {
    return this.http
      .post<LoginRequest>(`${environment.apiURL}/api/auth/signin`, user)
      .subscribe(
        (res: any) => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          // this.getUserProfile(res._id).subscribe((res) => {
          this.router.navigate(['/']);
          // });
        },
        () => {
          // LoginComponent.error(true)
        },
      );
  }
  getToken() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) return JSON.parse(currentUser).accessToken;
  }
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('currentUser');
    return authToken !== null;
  }
  doLogout() {
    const removeToken = localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  hasModificationRight(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const roles = JSON.parse(currentUser).roles;
      return roles.includes(Role.MODIFICATION) || roles.includes(Role.ADMIN);
    }
    return false;
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
