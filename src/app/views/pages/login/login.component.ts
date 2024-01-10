import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LoginRequest } from 'src/app/shared/loginRequest';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  detour: Subscription | undefined;
  errorModification = false;
  user: LoginRequest = {
    username: '',
    password: '',
  };
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {}

  login() {
    this.authService.http
      .post<LoginRequest>(`${environment.apiURL}/api/auth/signin`, this.user)
      .subscribe(
        (res: any) => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.authService.currentUserSubject.next(res);
          this.router.navigate(['/']);
        },
        (error) => {
          this.showErrorModification(true);
        },
      );
  }

  public showErrorModification(flag: boolean) {
    this.errorModification = flag;
  }
}
