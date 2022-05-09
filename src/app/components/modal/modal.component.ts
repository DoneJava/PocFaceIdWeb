import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Vivacidade } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  isHidden: boolean = false;
  Measures: any = {height: 500, width: 500}
  img: any = ''
  res: string = ''

  vivacidade: Vivacidade = {}

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public helper: HelperService,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.helper.loopShoot = true

    this.http.getRandom().subscribe((data) => {
      this.res = data.mensagemResposta
      this.helper.random = data.numero
    }, (error) => {

    })
  }

  close():void {
    this.dialogRef.close();
    this.helper.webImg = null
  }

  saveAndClose(): void {
    this.dialogRef.close();
  }

  refuse(): void {
    this.isHidden = false
    this.img = null
  }

  attPicWasTaken(event: boolean){
      this.isHidden = true
      this.img = this.helper.webImg
  }

  emiter(): void{
      this.vivacidade.img = this.helper.webImg
      this.vivacidade.validador = this.helper.random
      this.http.postVivacidade(this.vivacidade).subscribe((data) => {
        this.helper.loopShoot = false
        this.helper.webImg = ''
      }, (error) => {
        this.helper.webImg = ''
      })
  }

}
