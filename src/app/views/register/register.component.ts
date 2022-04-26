import { FormControl, Validators } from '@angular/forms';
import { ImgService } from './../../services/img.service';
import { Component, Output, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TakePhotoService } from 'src/app/services/take-photo.service';
import { HttpService } from 'src/app/services/http.service';
import { IsloadingService } from 'src/app/services/isloading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  @Output() formFields: any = {
    inputs: [
      { show: 'Nome', name: 'name', type: 'text', class: 'name' },
      { show: 'CPF', name: 'cpf', type: 'text', class: 'cpf', mask: '000.000.000-99' },
      { show: 'Senha', name: 'password', type: 'password', class: 'password' },
      { show: 'Confirmação de senha', name: 'passwordConfimation', type: 'password', class: 'passwordConfimation' },
    ],
    formGroup: {
      name: [null, Validators.required],
      cpf: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfimation: [null, Validators.required]
    }
  }


  constructor(
    private ImgService: ImgService,
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog,
    private takingShoot: TakePhotoService,
    public Loading: IsloadingService
  ) { }
  ngOnInit(): void {
    this.takingShoot.loopShoot = false
  }

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


  returnImg(): boolean {
    if (this.ImgService.webImg)
      return true
    else
      return false
  }

  listenerForm(event: any) {
    if (!this.CpfValidator(event)) {
      this._snackBar.open('CPF inválido.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }
    else if (!this.ImgService.webImg) {
      this._snackBar.open('A foto é obrigatória.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }
    else if (event.valid) {
      this.Loading.isLoading.next(true)
      event.value.img = this.ImgService.webImg

      this.http.putUser(event.value).subscribe((data) => {
        this.Loading.isLoading.next(false)
        this._snackBar.open('Registro feito com sucesso!', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.router.navigate(['']);
      }, (error) => {
        this.Loading.isLoading.next(false)
        this._snackBar.open('Erro ao efetuar registro.', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      })
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
    });
  }
}
