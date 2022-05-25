import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  toResetPassword = `${environment.API}ResetarSenha`
  toForgotPassword = `${environment.API}EsqueciSenha`;
  toRegister = `${environment.API}Cadastrar`;
  toVivacityRegister = `${environment.API}VerificarVivacidadeCadastro`
  toConfirmRegister = `${environment.API}ConfirmarCadastro`
  toLogin = `${environment.API}Login`;
  toMonitoring = `${environment.API}Monitoramento`;
  toVivacityCheck = `${environment.API}VerificarVivacidade`
  toGetRandom = `${environment.API}Random`
  toGetListPhotos = `${environment.API}CandidatoMonitorado`



  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //#region GET
  getRandom(): Observable<any> {
    return this.http.get(this.toGetRandom)
  }
  getList(): Observable<any> {
    return this.http.get(this.toGetListPhotos)
  }
  //#endregion

  //#region PUT
  putLogin(data: any): Observable<any> {
    return this.http.put(this.toLogin, data)
  }
  putEsqueciSenha(data: any): Observable<any> {
    return this.http.put(this.toForgotPassword, data)
  }
  putResetarSenha(data: any): Observable<any> {
    return this.http.put(this.toResetPassword, data)
  }
  putUser(data: any): Observable<any> {
    return this.http.put(this.toRegister, data)
  }
  //#endregion
  
  //#region POST
  postValidar(data: any): Observable<any> {
    return this.http.post(this.toMonitoring, JSON.stringify(data), this.httpHeader)
  }
  postVivacidade(data: any): Observable<any> {
    return this.http.post(this.toVivacityCheck, JSON.stringify(data), this.httpHeader)
  }
  postVivacidadeCadastro(data: any): Observable<any> {
    return this.http.post(this.toVivacityRegister, JSON.stringify(data), this.httpHeader)
  }
  postVericarCadastro(data: any): Observable<any> {
    return this.http.post(this.toConfirmRegister, JSON.stringify(data), this.httpHeader)
  }
  //#endregion
}
