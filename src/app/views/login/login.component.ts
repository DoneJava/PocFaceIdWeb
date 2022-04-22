import { AxiosService } from './../../services/axios.service';
import { Component, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() formFields: any = {
    inputs: [
      { show: 'CPF', name: 'cpf', type: 'text', class: 'login', mask: '000.000.000-99' },
      { show: 'Senha', name: 'password', type: 'password', class: 'password' }
    ],
    formGroup: {
      cpf: [null, Validators.required],
      password: [null, Validators.required]
    },
    buttons: [
      { show: 'Login', name: 'btn', type: 'submit', class: 'submit' }
    ]
  }

  constructor(
    private _snackBar: MatSnackBar,
    private axios: AxiosService,
    private router: Router
  ) { }


  listenerForm(event: any) {
    if (event.valid) {
      this.axios
        .putLogin(event.value)
        .then((res) => {
          this._snackBar.open('Login feito com sucesso!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['autenticar']);
        })
        .catch(() => this._snackBar.open('Usuário ou senha inválido!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }));
    }
    else {
      this._snackBar.open('Formulário inválido', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }
  }
}
