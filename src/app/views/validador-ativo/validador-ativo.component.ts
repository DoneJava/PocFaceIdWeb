import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, vivacidade } from 'src/app/interfaces/user';
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
  messageToUser: any = ''
  passValidar: string = 'naoPassou'


  ngOnInit(): void {
    this.helper.loopShoot = true

    setTimeout(() => {
      this.messageToUser = this.helper.messageToValidar
    }, 2000)
  }

  data: vivacidade = { };

  //Recebe o formulário e envia para a API
  emiter(): void {
    this.data.Img = this.helper.webImg

    if (this.helper.messageToValidar) {
      this.http.postVivacidade(this.data).subscribe((data) => {
        this.passValidar = 'passou'
        this.helper.loopShoot = false
        this.messageToUser = data.mensagemResposta
        console.log(data)
      }, (error) => {

        if (error.status == 401) {
          this.passValidar = 'reprovou'
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
    else {
      this.passValidar = 'reprovou'
      this.helper.loopShoot = false
      this.messageToUser = "É necessário realizar o login novamente..."
      setTimeout(() => {
        localStorage.clear()
        this.helper.webImg = '';
        this.helper.cpf = null;
        this.helper.senha = null;
        this.router.navigate(['/'])
      }, 3000);
    }
  }

  //Retira toke e foto do storage e desloga o usuário
  exit(): void {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}


