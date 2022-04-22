import { Validators } from '@angular/forms';
import { AxiosService } from './../../services/axios.service';
import { ImgService } from './../../services/img.service';
import { Component, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

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
    private axios: AxiosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  returnImg(): boolean {
    if (this.ImgService.webImg)
      return true
    else
      return false
  }

  listenerForm(event: any) {
    if (!this.ImgService.webImg) {
      this._snackBar.open('A foto é obrigatória.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }
    else if (event.valid) {
      event.value.img = this.ImgService.webImg

      this.axios
        .putUser(event.value)
        .then((x) => {
          this._snackBar.open('Registro feito com sucesso!', 'Close');
          this.router.navigate(['']);
        })
        .catch((x) =>
          this._snackBar.open('Erro ao efetuar registro.', 'Close')
        );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      height: '550px',
    });
  }
}
