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
    private ImgService: ImgService,
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
  logar() {
    this.data.cpf =
      document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value;
    this.user.cpf =
      document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value;
    this.data.password =
      document.querySelector<HTMLInputElement>('input[id="senha"]')?.value;
    this.user.senha =
      document.querySelector<HTMLInputElement>('input[id="senha"]')?.value;
    this.axios
      .putLogin(this.data)
      .then((x) => {
        this._snackBar.open('Login feito com sucesso!', 'Close');
        this.router.navigate(['autenticar']);
      })
      .catch((x) => this._snackBar.open('Erro ao efetuar login.', 'Close'));
  }
}
