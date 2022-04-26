import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlApi = 'https://localhost:44388/api/Face/Cadastrar';
  urlApiLogin = 'https://localhost:44388/api/Face';

 

  constructor(private http: HttpClient) { }
  
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  putUser(data: any): Observable<any> {
    return this.http.put(this.urlApi, data)
  }
  putLogin(data: any): Observable<any> {
    return this.http.put(this.urlApiLogin, data)
  }
  postValidar(data: any): Observable<any> {
    return this.http.post(this.urlApiLogin, JSON.stringify(data), this.httpHeader)
  }
}
