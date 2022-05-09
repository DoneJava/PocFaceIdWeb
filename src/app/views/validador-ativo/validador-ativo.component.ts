import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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
  messageToUser: any
  timeIsOver: boolean = false
  imgBD: any
  passValidar: number = 0



  ngOnInit(): void {
    this.helper.loopShoot = true
    this.messageToUser = this.helper.message
  }

  data: User = {};

  //Recebe o formulário e envia para a API
  emiter(): void {

    this.data.img = this.helper.webImg
    this.http.postVivacidade(this.data).subscribe((data) => {
      this.passValidar = 1
    }, (error) => {
      this.timeIsOver = true
      if (error.statusText == 'Unknown Error') {
        this.messageToUser = 'Sem conexão com a API.'
        setInterval(() => (
          this.router.navigate(['/']),
          localStorage.clear()
          ), 5000)
      }
    })
  }

  //Retira toke e foto do storage e desloga o usuário
  exit(): void {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}


