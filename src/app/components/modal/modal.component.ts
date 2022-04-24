import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImgService } from 'src/app/services/img.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isHidden: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public imgWeb: ImgService
  ) {}

  close():void {
    this.dialogRef.close();
    this.imgWeb.webImg = null
  }

  saveAndClose(): void {
    this.dialogRef.close();
  }

  refuse(): void {
    this.isHidden = false
    let img: any = document.getElementById('picture')
    document.getElementById('main')?.removeChild(img)
    this.imgWeb.webImg = null
  }

  appendImg(){
    let img = document.createElement('img')
    img.src = this.imgWeb.webImg
    img.id = 'picture'
    img.style.width = '400px'
    document.getElementById('main')?.appendChild(img)
  }

  attPicWasTaken(){
    this.isHidden = true
    this.appendImg()

  }

}
