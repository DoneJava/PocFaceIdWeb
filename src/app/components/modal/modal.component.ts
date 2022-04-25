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

  img: any = ''

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
    this.img = null
  }

  attPicWasTaken(event: boolean){
      this.isHidden = true
      this.img = this.imgWeb.webImg
  }

}
