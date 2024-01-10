import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (!req.url.includes('auth/signin'))
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/signin') &&
          (error.status === 401 || error.status === 403)
        ) {
          this.authService.doLogout();
        }

        return throwError(() => error);
      }),
    );
  }
}
