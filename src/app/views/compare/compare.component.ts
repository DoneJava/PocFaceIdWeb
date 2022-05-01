import { Component, OnInit } from '@angular/core';
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
    private http: HttpService
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

  onImgBase64(event: any): void {
    this.data.cpf = this.helper.cpf
    this.data.password = this.helper.senha
    this.data.img = event
    console.log(this.data)
    this.http.postValidar(this.data).subscribe((data) => {
      this.res = data.mensagemResposta
      
    }, (error) => {
      this.timeIsOver = true
      console.log(error)
      
    })
  }

}
