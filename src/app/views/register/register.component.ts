import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { vivacidade } from 'src/app/interfaces/user';
import { CpfValidatorService } from 'src/app/services/cpf-validator.service';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

import { FacesComponent } from './../../components/faces/faces.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  //Output para informar ao formulário quais campos gerar.
  @Output() formFields: any = {
    inputs: [
      { show: 'Nome e Sobrenome', name: 'Nome', type: 'text', class: 'name' },
      { show: 'CPF', name: 'cpf', type: 'text', class: 'cpf', mask: '000.000.000-99' },
      { show: 'Senha', name: 'Senha', type: 'password', class: 'password' },
      { show: 'Confirmação de senha', name: 'passwordConfimation', type: 'password', class: 'passwordConfimation' },
    ],
    formGroup: {
      Nome: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\u00C0-\\u017F´]+\\s+[a-zA-Z\\u00C0-\\u017F´]{0,}$')]],
      cpf: [null, Validators.required],
      Senha: [null, Validators.required],
      passwordConfimation: [null, Validators.required]
    },
  }

  @ViewChild(CameraComponent, { static: false })
  camera!: CameraComponent;

  @ViewChild(FacesComponent, { static: false })
  face!: FacesComponent;

  cadastro: any = ''
  onSubmit: boolean = true
  cameraOff: boolean = true
  Measures: any = { height: 500, width: 490 }
  messageToUser: string = ''
  user: vivacidade = {}
  VivacidadeNaoValidada: boolean = true
  contador: number = 10
  getError: boolean = false

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    public router: Router,
    public dialog: MatDialog,
    public helper: HelperService,
    private cpf: CpfValidatorService,
    private iconRegistry: MatIconRegistry,
    private sanitize: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('arrow', this.sanitize.bypassSecurityTrustResourceUrl('assets/arrow.svg'))
   }

  ngOnInit(): void {
    //Informa ao componente camera que ele não precisa iniciar loop de fotos
    this.helper.loopShoot = true

    
  }

  turnOffAndCallRandom(): void {
    this.cameraOff = false
    this.getRandom()
  }

  getRandom(): void {
    this.http.getRandom().pipe(retry(5)).subscribe((data) => {
      setTimeout(() => {
        this.messageToUser = data.mensagemResposta
      }, 3000);
    }, (error) => {
      this.getError = true
      if(error.status == 0){
        this._snackBar.open("Talvez você esteja sem internet.", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    })
  }

  //Verifica se há alguma foto
  returnImg(): boolean {
    if (this.helper.webImg)
      return true
    else
      return false
  }

  //Recebe formulário do app-formulário e envia para api
  listenerForm(event: any) {
    if (event.valid) {
      if (!this.cpf.CpfValidator(event)) {
        this._snackBar.open('CPF inválido.', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
      else if (event.valid) {
        this.cadastro = event.value
        this.onSubmit = false
      }
    }
  }

  ValidaVivacidade(): void {
      this.user.Img = this.helper.webImg
      this.http.postVivacidadeCadastro(this.user).subscribe((data) => {
        this.VivacidadeNaoValidada = false
        this.helper.loopShoot = false
        console.log('off')
        this.helper.webImg = ''
        this.takePhoto()
      }, (error) => {
        this.helper.webImg = ''
        console.log(error)
        if (error.status == 401) {
          this.helper.loopShoot = false
          this._snackBar.open('Não possível validar a vivacidade, tente novamente.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          })
          this.helper.webImg = null
        }
        else if(error.status == 400){
          console.log(error.error)
          if(error.error.etapa1 == true)
            this.face.id1.style.fill = '#38FF1E'
          if(error.error.etapa2 == true)
            this.face.id2.style.fill = '#38FF1E'
          if(error.error.etapa3 == true)
            this.face.id3.style.fill = '#38FF1E'
        }
      })
  }

  takePhoto():void {

    let interval = setInterval(() => {
      if(this.contador > 0){
        this.contador--
      }else{
        this.camera.triggerSnapshot()
        clearInterval(interval)
      }
    }, 1000)
  }

  takeAgain(): void {
    this.helper.webImg = ''
    this.contador = 10
    this.takePhoto()
  }

  SendForm(): void {
    this.cadastro.img = this.helper.webImg
    this.helper.isLoading.next(true)
    this.http.putUser(this.cadastro).subscribe((data) => {
      this.helper.isLoading.next(false)
      this._snackBar.open('Registro feito com sucesso!', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigate(['']);
      this.helper.webImg = ''
    }, (error) => {
      this.helper.isLoading.next(false)
      console.log(error.status)
      if(error.status == 409){
        this.onSubmit = true
        this._snackBar.open('Usuário já cadastrado na base.', 'Close', {
          duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.helper.webImg = ''
        this.router.navigate(['/'])
      }
      else{
        this._snackBar.open('Erro ao efetuar registro.', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }
 
}