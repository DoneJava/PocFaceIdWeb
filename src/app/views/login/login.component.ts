import { Component, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { login } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';

import { HttpService } from '../../services/http.service';
import { SnackBarService } from './../../services/snack-bar.service';

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
      { show: 'Senha', name: 'password', type: 'password', class: 'password' },
    ],
    formGroup: {
      cpf: [null, Validators.required],
      password: [null, Validators.required]
    },
    buttons: [
      { show: 'Login', name: 'btn', type: 'submit', class: 'submit' }
    ],
    link: [
      { show: "Esqueceu a senha?", name: 'link', href: '' }
    ]
  }

  user: login = {}
  lostPassword: boolean = false
  authFace: boolean = false

  constructor(
    //servico para chamar a snackBar
    private snack: SnackBarService,
    //servico para comunicacao http
    private http: HttpService,
    //servico para ter acesso a variaveis globais
    public helper: HelperService,
    public dialog: MatDialog,
    //roteamento
    private router: Router,
  ) { }

  ngOnInit(): void {
    //cancelar o monitoramento (seguranca)
    this.helper.tracking = false
  }

  //abertura do dialog passando o tamanho e os parametros dos fields
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
    });

    dialogRef.componentInstance.FieldsDialog = {
      title: 'Autenticação Facial.',
      type: 'cam',
      login: true
    }
  }

  //Recebe formulário e envia para API
  listenerForm(event: any) {
    //valida se formulario esta valido
    if (event.valid) {
      //seta valores no objeto e nas variaveis globais
      this.helper.cpf = this.user.CPF = event.value.cpf;
      this.helper.senha = this.user.Senha = event.value.password

      //seta os campos no local storage em base64
      localStorage.setItem(btoa('CPF'), btoa(this.helper.cpf))
      localStorage.setItem(btoa('Senha'), btoa(this.helper.senha))

      //validacao se o login como adm
      if (event.value.cpf == '00000000000' && event.value.password == '0000') {
        this.router.navigate(['/adm'])
      }
      //inicia o processo de login
      else {
        //inicia o component loading
        this.helper.isLoading.next(true)
        //faz o put do login
        this.http.putLogin(this.user).subscribe((data) => {
          this.helper.nome = data.nomeUsuario
          //seta o nome do usuario no local storage em base64
          localStorage.setItem(btoa('nome'), btoa(data.nomeUsuario))
          this.helper.imgBD = "data:image/png;base64," + data.foto
          //seta a foto do usuario no local storage em base64
          localStorage.setItem(btoa('imgBD'), btoa("data:image/png;base64," + data.foto))
          this.http.getRandom().subscribe((data) => {
            this.helper.random = data.mensagemResposta;
            this.helper.messageToValidar = data.mensagemResposta;
            this.openDialog();
          }, (error) => { })

        }, (error) => {
          this.helper.isLoading.next(false)
          if (error.status == 401) {
            this.snack.showSnack({ message: 'Usuário ou senha inválido!', duration: 3000 })
          } else {
            this.snack.showSnack({ message: 'Erro ao tentar conexão com o servidor', duration: 3000 })
          }
        })
      }
    }
  }

  //muda o componente para mudar a senha
  toForgot(): void {
    this.lostPassword = true
  }

  //muda o componente para login
  toLogin(): void {
    this.lostPassword = false
  }

}
