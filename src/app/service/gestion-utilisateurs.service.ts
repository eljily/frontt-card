import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/GestionUtilisateurs';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class GestionUtilisateursService {
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<User[]>(environment.apiURL + `/api/auth/users`);
  }
  findRoles() {
    return this.http.get<Role[]>(environment.apiURL + `/api/auth/roles`);
  }
  deleteUser(username: string) {
    return this.http.delete<User[]>(
      environment.apiURL + '/api/auth/' + username,
    );
  }
  update(user: User) {
    return this.http.put<User[]>(
      environment.apiURL + '/api/auth/signput',
      user,
    );
  }
}
