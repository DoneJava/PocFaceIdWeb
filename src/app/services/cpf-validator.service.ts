import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpfValidatorService {

  constructor() { }

  CpfValidator(control: any):  boolean | null {
    if (control.value.cpf == null || control.value.cpf === undefined) {
      return false;
    }
    const cpf = control.value.cpf.replace(/\D/g, "");
    var Soma = 0;
    var strCPF = cpf;
    if (
      strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' || strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' || strCPF === '99999999999' || strCPF.length !== 11) {
      return false;
    }
    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    var Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(9, 10))) {
      return false;
    }
    Soma = 0;
    for (let k = 1; k <= 10; k++) {
      Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
    }
    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(10, 11))) {
      return false;
    }
    return true;
  }
}
