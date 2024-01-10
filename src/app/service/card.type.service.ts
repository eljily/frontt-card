import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CardType } from '../model/CardType';

@Injectable({
  providedIn: 'root',
})
export class CardTypeService {
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<CardType[]>(environment.apiURL + `/api/cardTypes`);
  }
}
