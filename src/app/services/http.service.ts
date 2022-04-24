import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlApi = 'https://localhost:44388/api/Cadastrar';
  urlApiLogin = 'https://localhost:44388/api/Face';

  constructor( private http: HttpClient) {}

  putUser(data: any): Observable<any> {
    return this.http.put(this.urlApi, data)
  }
  putLogin(data: any): Observable<any> {
    return this.http.put(this.urlApiLogin, data)
  }
  postValidar(data: any): Observable<any> {
    return this.http.post(this.urlApiLogin, data)
  }
}
