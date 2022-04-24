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
  
  meter: number = 0
  validation: any = ''
  timeIsOver: boolean = false
  imgBD: any = this.img.imgBD

  ngOnInit(): void {
    this.takingShoot.loopShoot = true

  }

  data: User = {
    name: undefined,
    cpf: undefined,
    password: undefined,
    img: undefined,
  };

  emiter() {
    if (this.meter <= 3) {
      this.data.img = this.img.webImg;
      this.data.cpf = this.img.cpf
      this.data.password = this.img.senha
      console.log(this.data)

      this.http.postValidar(this.data).subscribe((data) => {
        this.validation = data.data
      }, (error) => {
        this.timeIsOver = true
      })

      this.meter++
    }
    else {
      this.timeIsOver = true
    }
  }

}
