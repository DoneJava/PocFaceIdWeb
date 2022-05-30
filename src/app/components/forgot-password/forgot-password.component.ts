import { FacesComponent } from './../faces/faces.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { User } from 'src/app/interfaces/user';

import { HelperService } from '../../services/helper.service';
import { HttpService } from './../../services/http.service';
import { SnackBarService } from './../../services/snack-bar.service';

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

  @ViewChild(CameraComponent, { static: false })
  camera!: CameraComponent;

  @ViewChild(FacesComponent, { static: false })
  face!: FacesComponent; 

  @Output() back = new EventEmitter()

  messageToUser: string = ''
  withoutCPF: boolean = true
  data: User = {}
  Measures: any = { height: 500, width: 490 }
  changeIsntReady: boolean = false

  constructor(
    private http: HttpService,
    private snack: SnackBarService,
    public helper: HelperService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitize: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('arrow', this.sanitize.bypassSecurityTrustResourceUrl('assets/arrow.svg'))
  }

  ngOnInit(): void {
  }

  getRandom(): void {
    this.http.getRandom().subscribe((data) => {
      this.helper.random = data.mensagemResposta;
      setTimeout(() => {
        this.emiter()
        this.messageToUser = data.mensagemResposta
      }, 3000);
    }, (error) => {
      if (error.status == 0) {
        this.snack.showSnack({ message: "Talvez você esteja sem internet.", duration: 3000 })
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
      this.snack.showSnack({ message: 'Usuário não encontrado.', duration: 3000 })
    })
  }

  emiter(): void {
    let over: boolean = false
    let contador = 0
    let interval = setInterval(() => {
      if (!over && contador != 20) {
        contador++
        this.camera.triggerSnapshot()
        this.data.Img = this.helper.webImg
        this.http.postVivacidade(this.data).subscribe((data) => {
          let div = document.getElementById('changeWidth') as HTMLDivElement
          div.style.width = '55%'
          this.changeIsntReady = true
        }, (error) => {
          if (error.error.etapa1 == true)
            this.face.id1.style.fill = '#38FF1E'
          if (error.error.etapa2 == true)
            this.face.id2.style.fill = '#38FF1E'
          if (error.error.etapa3 == true)
            this.face.id3.style.fill = '#38FF1E'

          if (error.status == 401) {
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
      else {
        clearInterval(interval)
      }
    }, 1000)
  }

  sendChange(event: any): void {
    if (event.value.password === event.value.passwordConfirmation) {
      this.data.Senha = event.value.password
      this.http.putResetarSenha(this.data).subscribe((data) => {
        this.snack.showSnack({ message: 'Senha alterada com sucesso', duration: 3000 })
        this.callBack()
      }, (error) => {
      })
    }
    else {
      this.snack.showSnack({ message: 'Senhas não conferem.', duration: 3000 })
    }
  }

  callBack(): void {
    this.back.emit(true)
  }

}
