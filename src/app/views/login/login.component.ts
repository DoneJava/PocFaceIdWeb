import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { login } from 'src/app/interfaces/user';
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
    private _snackBar: MatSnackBar,
    private http: HttpService,
    public helper: HelperService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.helper.loopShoot = false

  }

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
    if (event.valid) {
      this.helper.cpf = this.user.CPF = event.value.cpf;
      this.helper.senha = this.user.Senha = event.value.password
      
      localStorage.setItem(btoa('CPF'), btoa(this.helper.cpf))
      localStorage.setItem(btoa('Senha'), btoa(this.helper.senha))

      this.helper.isLoading.next(true)
      this.http.putLogin(this.user).subscribe((data) => {
        this.openDialog()
      }, (error) => {
        this.helper.isLoading.next(false)
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

  toForgot(): void {
    this.lostPassword = true
  }

  toLogin(): void {
    this.lostPassword = false
  }

}
