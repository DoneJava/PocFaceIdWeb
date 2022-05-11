import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { vivacidade } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  isHidden: boolean = false;
  Measures: any = { height: 500, width: 490 }
  img: any = ''
  res: string = ''
  contador: number = 0;

  user: vivacidade = {}

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public helper: HelperService,
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.helper.loopShoot = true

    this.http.getRandom().subscribe((data) => {
      this.res = data.mensagemResposta

    }, (error) => {

    })
  }

  close(): void {
    this.dialogRef.close();
    this.helper.loopShoot = false
    this.helper.webImg = null
  }

  saveAndClose(): void {
    this.user.Img = this.helper.webImg;
    this.http.postVericarCadastro(this.user).subscribe((data) => {
      this.dialogRef.close();
    }, (error) => {
      this._snackBar.open('É necessário que a pessoa do cadastro e prova de vida sejam as mesmas', 'Close', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })

    })
  }                     

  refuse(): void {
    this.isHidden = false
    this.img = null
  }

  attPicWasTaken(event: boolean) {
    this.isHidden = true
    this.img = this.helper.webImg
  }

  emiter(): void {
    if (this.contador <= 5) {
      this.contador++
      this.user.Img = this.helper.webImg
      this.http.postVivacidadeCadastro(this.user).subscribe((data) => {
        this.helper.loopShoot = false
        this.helper.webImg = ''
      }, (error) => {
        this.helper.webImg = ''                     
        if (error.statusText == 'Unknown Error') {
          this.res = 'Sem conexão com a API.'
          setInterval(() => {                                                                                         
            localStorage.clear()
          })
        }
      })
    }
    else{
      this._snackBar.open('Não possível validar a vivacidade, tente novamente.', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })
      this.helper.webImg = null
      this.dialogRef.close();
    }
  }

}
