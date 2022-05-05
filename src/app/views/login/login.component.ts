import { HttpService } from '../../services/http.service';
import { Component, Output, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/Helper.service';
import { User } from 'src/app/interfaces/user';

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

  user: User = {}

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    public helper: HelperService,
  ) { }

  ngOnInit(): void {
    //Informa ao componente camera que ele não precisa iniciar loop de fotos
    this.helper.loopShoot = true
  }

  //Recebe formulário e envia para API
  listenerForm(event: any) {
    this.helper.cpf = event.value.cpf;
    this.helper.senha = event.value.password

    this.user.cpf = this.helper.cpf;
    this.user.img = this.helper.webImg;
    this.user.password = this.helper.senha;

    this.helper.isLoading.next(true)
    if (event.valid) {
      this.http.putLogin(event.value).subscribe((data) => {
        let foto = "data:image/jpeg;base64," + data.mensagemResposta
        this.helper.imgBD = foto
        localStorage.setItem('foto', foto) 
        this.http.postValidar(this.user).subscribe((data) => {
          this.http.getRandom().subscribe((data) => {
            this.helper.message = data.mensagemResposta
            this.helper.random = data.numero
            this.router.navigate(['autenticar/ativo'])
            this._snackBar.open('Login feito com sucesso!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            localStorage.setItem('token', 'true')
            this.helper.isLoading.next(false)
          },
           (error) => {
             console.log(error)
           })
        }, (error) => {
        })        

      }, (error) => {
        this.helper.isLoading.next(false)
        console.log(error)
        if (error.status == 401 ) {
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
    else {
      this._snackBar.open('Formulário inválido', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }
  }

  emiter():void {
  }
}
