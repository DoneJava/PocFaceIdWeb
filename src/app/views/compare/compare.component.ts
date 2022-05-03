import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/Helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(
    public helper: HelperService,
    private http: HttpService,
    private route: Router
    ) { }

  imgBD: any
  timeIsOver: boolean = false
  loaded: boolean = false
  res: string = ''

  data: User = {}


  ngOnInit(): void {
    if (this.helper.imgBD != undefined)
      this.imgBD = this.helper.imgBD
    else
      this.imgBD = localStorage.getItem('foto')
  }

  onClick() {
    this.helper.myimage = undefined
  }

  onBack(): void {
    this.route.navigate(["/menu"])
  }

  onImgBase64(event: any): void {
    this.data.cpf = this.helper.cpf
    this.data.password = this.helper.senha
    this.data.img = event
    console.log(this.data)
    
    this.http.postValidar(this.data).subscribe((data) => {
      this.res = data.mensagemResposta
      
      switch(data.statusMensagem){
        case 1:
          this.res = "Nenhum rosto detectado."
          break;
        
        case 2:
          this.res = "Mais de um rosto na foto, por favor, insira imagens somente com um rosto..."
          break;

        case 3:
          this.res = `${data.mensagemResposta} | accuracy: ${data.confidence}`
          break;

        case 4:
          this.res = `${data.mensagemResposta} | accuracy: ${data.confidence}`
          break;
      }


    }, (error) => {
      this.timeIsOver = true
      console.log(error)
      
    })
  }

}
