import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, Vivacidade } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-validador-ativo',
  templateUrl: './validador-ativo.component.html',
  styleUrls: ['./validador-ativo.component.css']
})
export class ValidadorAtivoComponent implements OnInit {

  constructor(
    public helper: HelperService,
    private http: HttpService,
    private router: Router
  ) { }

  Measures: any = { height: 400, width: 400 }
  validation: any
  timeIsOver: boolean = false
  imgBD: any
  passValidar: number = 0



  ngOnInit(): void {
    this.helper.loopShoot = true
    if (this.helper.imgBD != undefined)
      this.imgBD = this.helper.imgBD
    else
      this.imgBD = localStorage.getItem('foto')

    this.validation = this.helper.message
  }

  data: User = {};
  vivacidade: Vivacidade = {}

  //Recebe o formulário e envia para a API
  emiter(): void {

    if(this.passValidar == 0){
      this.vivacidade.img = this.helper.webImg
      this.vivacidade.validador = this.helper.random
      this.http.postVivacidade(this.vivacidade).subscribe((data) => {
        this.passValidar = 1
        this.validation = data.mensagemResposta
        console.log(data)
      }, (error) => {
      })
    }
    else if(this.passValidar == 1){
      this.data.cpf = this.helper.cpf
      this.data.img = this.helper.webImg
      this.data.password = this.helper.senha

      this.http.postValidar(this.data).subscribe((data) => {
        this.passValidar = 2
        this.validation = data.mensagemResposta
        console.log(data)
      }, (error) => {

      })
    }
  }

  //Retira toke e foto do storage e desloga o usuário
  exit(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('foto')

    this.router.navigate(['/'])
  }

}


