import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../model/Card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}
  find(searchText: string, size = 10) {
    return this.http.get<Card[]>(
      environment.apiURL + `/api/cards?searchText=${searchText}&size=${size}`,
    );
  }
}
