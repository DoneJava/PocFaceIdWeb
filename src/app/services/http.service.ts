import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlApiCadastrar = 'https://localhost:44388/api/Face/Cadastrar';
  urlApiLogin = 'https://localhost:44388/api/Face/Login';
  urlApiValidar = 'https://localhost:44388/api/Face/Validar';
  urlApiVerificarImg = 'https://localhost:44388/api/Face/VerificarImg';

 

  constructor(private http: HttpClient) { }
  
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  putUser(data: any): Observable<any> {
    return this.http.put(this.urlApiCadastrar, data)
  }
  putLogin(data: any): Observable<any> {
    return this.http.put(this.urlApiLogin, data)
  }
  postValidar(data: any): Observable<any> {
    return this.http.post(this.urlApiValidar, JSON.stringify(data), this.httpHeader)
  }
}
