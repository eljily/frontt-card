import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageableData } from 'src/app/model/PageableData';
import { Request } from 'src/app/model/Request';
import {Batch} from "../model/Batch";

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}
  findAll(page: number, size: number) {
    return this.http.get<PageableData<Request>>(
      environment.apiURL + `/api/requests?page=${page}&size=${size}`,
    );
  }
  findAllAccepted(page: number, size: number) {
    return this.http.get<PageableData<Request>>(
      environment.apiURL + `/api/requests/acceptedRequests?page=${page}&size=${size}`
    );
  }
  findById(id: string) {
    return this.http.get<Request>(environment.apiURL + `/api/requests/${id}`);
  }
  saveBatch(batch: Batch) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post<Batch>(
      environment.apiURL + `/api/batch`,batch
      ,
      { headers },
    );
  }

  save(request: Request) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post<Request>(
      environment.apiURL + `/api/requests`,
      request,
      { headers },
    );
  }
  update(request: Request) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.put<Request>(
      environment.apiURL + `/api/requests`,
      request,
      { headers },
    );
  }
}
