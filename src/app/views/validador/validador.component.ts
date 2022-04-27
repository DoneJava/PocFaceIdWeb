import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { ImgService } from 'src/app/services/img.service';
import { TakePhotoService } from 'src/app/services/take-photo.service';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
})
export class ValidadorComponent implements OnInit {

  constructor(
    private takingShoot: TakePhotoService,
    private img: ImgService,
    private http: HttpService
  ) { }
  
  Measures: any = {height: 400, width: 400}
  validation: any = ''
  timeIsOver: boolean = false
  imgBD: any

  ngOnInit(): void {
    this.takingShoot.loopShoot = true
    if(this.img.imgBD != undefined)
      this.imgBD = this.img.imgBD
    else
    this.imgBD = localStorage.getItem('foto')
  }

  data: User = {
    name: undefined,
    cpf: undefined,
    password: undefined,
    img: undefined,
  };

  emiter() {
      this.data.img = this.img.webImg;
      this.data.cpf = this.img.cpf
      this.data.password = this.img.senha
      this.http.postValidar(this.data).subscribe((data) => {
        let font = document.getElementById('validacao') as HTMLDivElement
        this.validation = data.mensagemResposta
        switch(data.statusMensagem){
          case 1:
            font.className = 'classBlue'
            break;
          case 2:
            font.className = 'classYellow'
            break;
          case 3:
            font.className = 'classGreen'
            break;
          case 4:
            font.className = 'classRed'
            break;
          default:
            font.className = ''
            break;
        }
        
      }, (error) => {
        this.timeIsOver = true
      })
  }

}


