import { SnackBarService } from './../../services/snack-bar.service';
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
      Nome: [null, [Validators.required, Validators.pattern('([A-Z][a-z]* [A-Z][a-z]*)')]],
      cpf: [null, Validators.required],
      Senha: [null, Validators.required],
      passwordConfimation: [null, Validators.required]
    },
  }

  //Instanciando decorator de propriedade para consulta de exibicao da camera
  @ViewChild(CameraComponent, { static: false })
  camera!: CameraComponent;

  //Instanciando decorator de propriedade para consulta de exibicao do componente dos rostos
  @ViewChild(FacesComponent, { static: false })
  face!: FacesComponent;

  //Instanciando variveis de controle
  onSubmit: boolean = true
  getError: boolean = false
  cameraOff: boolean = true
  VivacidadeNaoValidada: boolean = true
  cadastro: any = ''
  Measures: any = { height: 500, width: 490 }
  messageToUser: string = ''
  user: vivacidade = {}
  contador: number = 10

  constructor(
    private snack: SnackBarService,
    private http: HttpService,
    public router: Router,
    public helper: HelperService,
    private cpf: CpfValidatorService,
    private iconRegistry: MatIconRegistry,
    private sanitize: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('arrow', this.sanitize.bypassSecurityTrustResourceUrl('assets/arrow.svg'))
  }

  ngOnInit(): void {
  }

  //Metodo responsavel por iniciar a camera e inicial o metodo do random da API
  turnOffAndCallRandom(): void {
    this.cameraOff = false
    this.getRandom()
  }

  //Metodo responsavel por chamar o random da API e iniciar o metodo da validacao de vivacidade
  getRandom(): void {
    this.http.getRandom().subscribe((data) => {
      setTimeout(() => {
        this.ValidaVivacidade()
        this.messageToUser = data.mensagemResposta
      }, 3000);
    }, (error) => {
      this.getError = true
      if (error.status == 0) {
        this.snack.showSnack({message: "Talvez você esteja sem internet.", duration: 3000})
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
        this.snack.showSnack({message: 'CPF inválido.', duration: 3000})
      }
      else if (event.valid) {
        this.cadastro = event.value
        this.onSubmit = false
       
      }
    }
  }

  //Metodo responsavel por realizar a validacao de vivacidade
  ValidaVivacidade(): void {
    let contador = 0;
    let interval = setInterval(() => {
      if (this.VivacidadeNaoValidada && contador != 20) {
        contador++
        this.camera.triggerSnapshot()
        this.user.Img = this.helper.webImg
        this.http.postVivacidadeCadastro(this.user).subscribe((data) => { this.VivacidadeNaoValidada = false; this.helper.webImg = ''; this.takePhoto() },
          (error) => {
            this.helper.webImg = '';
            if (error.status == 401) {
              this.snack.showSnack({message: 'Não possível validar a vivacidade, tente novamente.'})
              this.helper.webImg = null
            }
            else if (error.status == 400) {
              if (error.error.etapa1 == true)
                this.face.id1.style.fill = '#38FF1E'
              if (error.error.etapa2 == true)
                this.face.id2.style.fill = '#38FF1E'
              if (error.error.etapa3 == true)
                this.face.id3.style.fill = '#38FF1E'
            }
          })
      } else if(contador >= 20 && this.VivacidadeNaoValidada){
        this.messageToUser = ''
        this.onSubmit = true
        this.cameraOff = true
        this.snack.showSnack({message: "Não foi possível verificar a vivacidade! Tente novamente."})
        clearInterval(interval)
      }
    }, 1000);
  }

  //Metodo responsavel por tirar foto apos o contador finalizar
  takePhoto(): void {
    let intervalTake = setInterval(() => {
      if (this.contador > 0) this.contador--;
      else { this.camera.triggerSnapshot(); clearInterval(intervalTake) }
    }, 1000)
  }

  //Metodo responsavel por zerar contador e chamar o metodo takePhoto()
  takeAgain(): void {
    this.helper.webImg = ''
    this.contador = 10
    this.takePhoto()
  }

  //Metodo que finaliza e envia o formulário
  SendForm(): void {
    this.cadastro.img = this.helper.webImg
    this.helper.isLoading.next(true)
    this.http.putUser(this.cadastro).subscribe((data) => {
      this.helper.isLoading.next(false)
      this.snack.showSnack({message: 'Registro feito com sucesso!', duration: 3000})
      this.router.navigate(['']);
      this.helper.webImg = ''
    }, (error) => {
      this.helper.isLoading.next(false)
      if (error.status == 409) {
        this.onSubmit = true
        this.snack.showSnack({message: 'Usuário já cadastrado na base.', duration: 7000})
        this.helper.webImg = ''
        this.router.navigate(['/'])
      }
      else {
        this.snack.showSnack({message: 'Erro ao efetuar registro.', duration: 3000})
      }
    })
  }

}