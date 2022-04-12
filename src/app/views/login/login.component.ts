import { AxiosService } from './../../services/axios.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ImgService } from './../../services/img.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private axios: AxiosService,
    private router: Router,
    private user: ImgService
  ) {}

  data: User = {
    name: '',
    cpf: '',
    password: '',
    img: '',
  };

  ngOnInit(): void {}
  async logar() {
    if (
      document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value !=
        '' &&
      document.querySelector<HTMLInputElement>('input[id="senha"]')?.value != ''
    ) {
      this.data.cpf =
        document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value;
      this.user.cpf =
        document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value;
      this.data.password =
        document.querySelector<HTMLInputElement>('input[id="senha"]')?.value;
      this.user.senha =
        document.querySelector<HTMLInputElement>('input[id="senha"]')?.value;
      await this.axios
        .putLogin(this.data)
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
    else{
      this._snackBar.open('Existem campos vazios!', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }
  }
}
