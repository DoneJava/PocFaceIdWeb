import { AxiosService } from './../../services/axios.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ImgService } from './../../services/img.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private ImgService: ImgService,
    private _snackBar: MatSnackBar,
    private axios: AxiosService,
    private router: Router
  ) {}

  data: User = {
    name: '',
    cpf: '',
    password: '',
    img: '',
  };

  ngOnInit() {}

  submit() {
    this.data.img = this.ImgService.webImg;
    if (this.data.img == undefined) {
      this._snackBar.open('É necessário tirar e salvar a foto.', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else if (
      document.querySelector<HTMLInputElement>('input[id="password"]')?.value !=
      document.querySelector<HTMLInputElement>(
        'input[id="passwordConfimation"]'
      )?.value
    ) {
      this._snackBar.open('Confirmação de senha inválida', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else if (
      document.querySelector<HTMLInputElement>('input[id="cpf"]')?.value ==
        '' ||
      document.querySelector<HTMLInputElement>('input[id="senha"]')?.value ==
        '' ||
      document.querySelector<HTMLInputElement>('input[id="Nome"]')?.value ==
        '' ||
      document.querySelector<HTMLInputElement>(
        'input[id="passwordConfimation"]'
      )?.value == ''
    ) {
      this._snackBar.open('Existem campos vazios!', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {
      this.data.name =
        document.querySelector<HTMLInputElement>('input[id="Nome"]')?.value;
      this.data.cpf =
        document.querySelector<HTMLInputElement>('input[id="CPF"]')?.value;
      this.data.password = document.querySelector<HTMLInputElement>(
        'input[id="password"]'
      )?.value;

      this.axios
        .putUser(this.data)
        .then((x) => {
          this._snackBar.open('Registro feito com sucesso!', 'Close');
          this.router.navigate(['']);
        })
        .catch((x) =>
          this._snackBar.open('Erro ao efetuar registro.', 'Close')
        );
    }
  }
}
