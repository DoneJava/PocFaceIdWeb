import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlResetSenha = 'https://localhost:44388/api/Face/ResetarSenha'//
  urlEsqueciSenha = 'https://localhost:44388/api/Face/EsqueciSenha';//
  urlApiCadastrar = 'https://localhost:44388/api/Face/Cadastrar';//
  urlApiVivacidadeCad = 'https://localhost:44388/api/Face/VerificarVivacidadeCadastro'//
  urlApiVerificarId = 'https://localhost:44388/api/Face/ConfirmarCadastro'//
  urlApiLogin = 'https://localhost:44388/api/Face/Login';//
  urlApiValidar = 'https://localhost:44388/api/Face/Validar';
  urlApiVerificarVivacidade = 'https://localhost:44388/api/Face/VerificarVivacidade'//
  urlRandomNumber = 'https://localhost:44388/api/Face/Random'//

 

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
