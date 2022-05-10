import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { login, User } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  //Output para informar ao formulário quais campos gerar.
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

  user: login = {}

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    public helper: HelperService,
  ) { }

  ngOnInit(): void {
    this.helper.loopShoot = false
  }

  //Recebe formulário e envia para API
  listenerForm(event: any) {
    this.helper.cpf = this.user.CPF = event.value.cpf;
    this.helper.senha = this.user.Senha = event.value.password

    this.helper.isLoading.next(true)
    this.http.putLogin(this.user).subscribe((data) => {
      this.http.getRandom().subscribe((data) => {
        this.helper.message = data.mensagemResposta
        localStorage.setItem('token', 'true')
        this.helper.isLoading.next(false)
        this.router.navigate(['autenticar'])
      },
        (error) => {
          console.log(error)
        })
    }, (error) => {
      this.helper.isLoading.next(false)
      console.log(error)
      if (error.status == 401) {
        this._snackBar.open('Usuário ou senha inválido!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })

      } else {
        this._snackBar.open('Erro ao tentar conexão com o servidor', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
      }
    })

  }
}
