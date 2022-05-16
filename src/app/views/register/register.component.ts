import { Validators } from '@angular/forms';
import { Component, Output, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { CpfValidatorService } from 'src/app/services/cpf-validator.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { vivacidade } from 'src/app/interfaces/user';
import { CameraComponent } from 'src/app/components/camera/camera.component';


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

  cadastro: any = ''
  onSubmit: boolean = true
  cameraOff: boolean = true
  Measures: any = { height: 500, width: 490 }
  messageToUser: string = ''
  user: vivacidade = {}
  VivacidadeNaoValidada: boolean = true
  contador: number = 10

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
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

    this.getRandom()
  }

  getRandom(): void {
    this.http.getRandom().subscribe((data) => {
      
      setTimeout(() => {
        this.messageToUser = data.mensagemResposta
      }, 2000);
    }, (error) => {

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
        this.helper.webImg = ''
        this.takePhoto()
      }, (error) => {
        console.log(this.helper.loopShoot)
        this.helper.webImg = ''
        if (error.status == 401) {
          this.helper.loopShoot = false
          this._snackBar.open('Não possível validar a vivacidade, tente novamente.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          })
          this.helper.webImg = null
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
      this._snackBar.open('Erro ao efetuar registro.', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    })
  }
 
}

 /* openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '900px'
    });
  } */

/* event.value.img = this.helper.webImg
        this.http.putUser(event.value).subscribe((data) => {
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
          this._snackBar.open('Erro ao efetuar registro.', 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }) */