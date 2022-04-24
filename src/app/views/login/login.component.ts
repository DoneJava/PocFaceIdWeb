import { HttpService } from '../../services/http.service';
import { Component, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ImgService } from 'src/app/services/img.service';

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
    private http: HttpService,
    private router: Router,
    private img: ImgService
  ) { }


  listenerForm(event: any) {
    if (event.valid) {
      this.http.putLogin(event.value).subscribe((data) => {
        this.img.imgBD = "data:image/jpeg;base64," + data.data

        this._snackBar.open('Login feito com sucesso!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.router.navigate(['autenticar']);
      }, (error) => {
        this._snackBar.open('Usuário ou senha inválido!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
      })
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
