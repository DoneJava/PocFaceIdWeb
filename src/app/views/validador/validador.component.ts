import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/Helper.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
})
export class ValidadorComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private http: HttpService,
    private router: Router
  ) { }

  Measures: any = { height: 400, width: 400 }
  validation: any = ''
  timeIsOver: boolean = false
  imgBD: any

  ngOnInit(): void {
    this.helper.loopShoot = true
    if (this.helper.imgBD != undefined)
      this.imgBD = this.helper.imgBD
    else
      this.imgBD = localStorage.getItem('foto')
  }

  data: User = {};


  //Recebe o formulário e envia para a API
  emiter(): void {
    this.data.img = this.helper.webImg;
    this.data.cpf = this.helper.cpf
    this.data.password = this.helper.senha
    this.data.img2 = this.helper.webImgAux

    console.log(this.data)

    this.http.postValidar(this.data).subscribe((data) => {
      this.validation = data.mensagemResposta
      this.changeColor(false, data)
    }, (error) => {
      this.timeIsOver = true
      console.log(error)
      this.changeColor(true, error)
    })
  }

  onBack(): void {
    this.router.navigate(["/menu"])
  }

  //Muda a cor da letra e câmera de acordo com a resposta da API
  changeColor(error: boolean, data: any): void {
    let font = document.getElementById('validacao') as HTMLDivElement
    let camera = document.getElementById('camera') as HTMLDivElement

    if (error) {
      font.className = 'classRed'
    }
    else {
      switch (data.statusMensagem) {
        case 1:
          font.className = 'classBlue'
          camera.className = 'classBorderBlue'
          break;
        case 2:
          font.className = 'classYellow'
          camera.className = 'classBorderYellow'
          break;
        case 3:
          font.className = 'classGreen'
          camera.className = 'classBorderGreen'
          break;
        case 4:
          font.className = 'classRed'
          camera.className = 'classBorderRed'
          break;
        default:
          font.className = ''
          break;
      }
    }
  }

  //Retira toke e foto do storage e desloga o usuário
  exit(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('foto')

    this.router.navigate(['/'])
  }

}


