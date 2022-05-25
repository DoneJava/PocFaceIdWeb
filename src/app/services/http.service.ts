import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlResetSenha = `${environment.API}ResetarSenha`
  urlEsqueciSenha = `${environment.API}EsqueciSenha`;
  urlApiCadastrar = `${environment.API}Cadastrar`;
  urlApiVivacidadeCad = `${environment.API}VerificarVivacidadeCadastro`
  urlApiVerificarId = `${environment.API}ConfirmarCadastro`
  urlApiLogin = `${environment.API}Face/Login`;
  urlApiValidar = `${environment.API}Monitoramento`;
  urlApiVerificarVivacidade = `${environment.API}VerificarVivacidade`
  urlRandomNumber = `${environment.API}Face/Random`

 

  constructor(private http: HttpClient) { }
  
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  putLogin(data: any): Observable<any> {
    return this.http.put(this.urlApiLogin, data)
  }
  putEsqueciSenha(data: any): Observable<any> {
    return this.http.put(this.urlEsqueciSenha, data)
  }
  putResetarSenha(data: any): Observable<any> {
    return this.http.put(this.urlResetSenha, data)
  }
  postValidar(data: any): Observable<any> {
    return this.http.post(this.urlApiValidar, JSON.stringify(data), this.httpHeader)
  }
  postVivacidade(data: any): Observable<any> {
    return this.http.post(this.urlApiVerificarVivacidade, JSON.stringify(data), this.httpHeader)
  }
  putUser(data: any): Observable<any> {
    return this.http.put(this.urlApiCadastrar, data)
  }
  postVivacidadeCadastro(data: any): Observable<any> {
    return this.http.post(this.urlApiVivacidadeCad, JSON.stringify(data), this.httpHeader)
  }
  postVericarCadastro(data: any): Observable<any> {
    return this.http.post(this.urlApiVerificarId, JSON.stringify(data), this.httpHeader)
  }
  getRandom(): Observable<any> {
    return this.http.get(this.urlRandomNumber)
  }
}
