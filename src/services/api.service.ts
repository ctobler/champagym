import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiurl = environment.apiurl;

  constructor(
    private httpClient: HttpClient
  ) { }

  get(url: string): Observable<any> {
    return this.httpClient.get(`${this.apiurl}/${url}`);
  }

  post(url: string, params: any): Observable<any> {
    return this.httpClient.post(`${this.apiurl}/${url}`, params);
  }

}
