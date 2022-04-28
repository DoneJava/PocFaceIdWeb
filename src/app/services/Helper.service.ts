import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {


  constructor() { }
  
  //User
  public webImg: any;
  public cpf: any;
  public senha: any;
  public nome: any;
  public imgBD: any
  
  //habilita/desabilita o loading
  public isLoading = new BehaviorSubject<Boolean>(false)

  //habilita/desabilita o loop de fotos
  public loopShoot: boolean = false

}