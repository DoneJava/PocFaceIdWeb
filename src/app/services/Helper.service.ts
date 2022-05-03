import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {


  constructor() { }
  
  //Foto tirada
  public webImg: any;
  public webImgAux: any;

  //User
  public cpf: any;
  public senha: any;
  public nome: any;
  public imgBD: any
  
  //habilita/desabilita o loading
  public isLoading = new BehaviorSubject<Boolean>(false)
  
  //ordena para qual parametro a foto deve ser enviada
  public semafaro = new BehaviorSubject<Number>(0)

  //habilita/desabilita o loop de fotos
  public loopShoot: boolean = false

  //
  myimage: Observable<any> | undefined;

}