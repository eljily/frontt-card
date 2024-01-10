import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../model/Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  find(searchText: string, size = 10) {
    return this.http.get<Account[]>(
      environment.apiURL +
        `/api/accounts?searchText=${searchText}&size=${size}`,
    );
  }
}
