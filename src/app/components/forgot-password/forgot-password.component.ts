import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { User } from 'src/app/interfaces/user';

import { HelperService } from './../../services/helper.service';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Output() formFields: any = {
    inputs: [
      { show: 'CPF', name: 'cpf', type: 'text', class: 'login', mask: '000.000.000-99' },
    ],
    formGroup: {
      cpf: [null, Validators.required]
    },
    buttons: [
      { show: 'Próximo', name: 'btn', type: 'submit', class: 'submit' },
    ]
  }
  
  @Output() formFieldsChange: any = {
    inputs: [
      { show: 'Senha', name: 'password', type: 'password', class: 'password' },
      { show: 'Confirmação de senha', name: 'passwordConfirmation', type: 'password', class: 'password' },
    ],
    formGroup: {
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    },
    buttons: [
      { show: 'Enviar', name: 'btn', type: 'submit', class: 'submit' },
    ]
  }

  @Output() back = new EventEmitter()
  messageToUser: string = ''
  withoutCPF: boolean = true
  data: User = {}
  Measures: any = { height: 500, width: 490 }
  changeIsntReady: boolean = false

  constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar,
    private helper: HelperService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitize: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('arrow', this.sanitize.bypassSecurityTrustResourceUrl('assets/arrow.svg'))
  }

  ngOnInit(): void {
    this.helper.loopShoot = true
  }

  getRandom(): void {
    this.http.getRandom().pipe(retry(5)).subscribe((data) => {
      setTimeout(() => {
        this.messageToUser = data.mensagemResposta
      }, 3000);
    }, (error) => {
      if (error.status == 0) {
        this._snackBar.open("Talvez você esteja sem internet.", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    })
  }

  listenerForm(event: any): void {
    this.data.CPF = event.value.cpf
    this.http.putEsqueciSenha(this.data).subscribe((data) => {
      let div = document.getElementById('changeWidth') as HTMLDivElement
      div.style.width = '80%'
      this.withoutCPF = false
      this.getRandom()
    }, (error) => {
      this._snackBar.open('Usuário não encontrado.', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }

  emiter(): void {
    this.data.Img = this.helper.webImg
    this.http.postVivacidade(this.data).subscribe((data) => {
      let div = document.getElementById('changeWidth') as HTMLDivElement
      div.style.width = '55%'
      this.helper.loopShoot = false
      this.changeIsntReady = true
    }, (error) => {
      if (error.status == 401) {
        this.helper.loopShoot = false
        this.messageToUser = error.error.mensagemResposta
        setTimeout(() => {
          setTimeout(() => {
            this.messageToUser = 'Redirecionando para o login...'
            localStorage.clear()
            this.helper.webImg = '';
            this.helper.cpf = null;
            this.helper.senha = null;
            this.router.navigate(['/'])
          }, 2000);
        }, 4000);
      }
      if (error.statusText == 'Unknown Error') {
        this.messageToUser = 'Sem conexão com a API.'
        setInterval(() => (
          this.router.navigate(['/']),
          localStorage.clear()
        ), 5000)
      }
    })
  }

  sendChange(event: any): void {
    if(event.value.password === event.value.passwordConfirmation){
      this.data.Senha = event.value.password
      this.http.putResetarSenha(this.data).subscribe((data) => {
        this._snackBar.open('Senha alterada com sucesso', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
          
        })
        this.callBack()
      }, (error) => {
        console.log(error)
      })
    }
    else {
      this._snackBar.open('Senhas não conferem.', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }
  }

  callBack(): void {
    this.back.emit(true)
  }

}
