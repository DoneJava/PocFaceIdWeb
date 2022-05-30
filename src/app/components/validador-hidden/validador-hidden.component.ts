import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HelperService } from 'src/app/services/helper.service';

import { User } from './../../interfaces/user';
import { HttpService } from './../../services/http.service';
import { CameraComponent } from './../camera/camera.component';

@Component({
  selector: 'app-validador-hidden',
  templateUrl: './validador-hidden.component.html',
  styleUrls: ['./validador-hidden.component.html']
})
export class ValidadorHiddenComponent implements OnInit {

  @ViewChild(CameraComponent, { static: false })
  camera!: CameraComponent;

  Measures: any = { height: 500, width: 490 }
  greenLight: boolean = true
  user: User = {}

  constructor(
    private helper: HelperService,
    private http: HttpService,
    public dialog: MatDialog,
    private _snakBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.hapyWay()
  }

  hapyWay(): void {
    let interval = setInterval(() => {
      if (this.greenLight && this.helper.tracking) {
        this.camera.triggerSnapshot()
        this.user.Img = this.helper.webImg
        if (this.helper.cpf && this.helper.senha) {
          this.user.CPF = this.helper.cpf
          this.user.Senha = this.helper.senha
        }
        else {
          this.user.CPF = atob(String(localStorage.getItem(btoa('CPF'))))
          this.user.Senha = atob(String(localStorage.getItem(btoa('Senha'))))
        }

        this.http.postValidar(this.user).subscribe((data) => { }, (error) => {
          if (error.status == 401) {
            if (error.error.code == 1)
              this.badWayOne(error.error.mensagemResposta)
            else if (error.error.code == 2)
              this.badWayTwo(error.error.mensagemResposta)
          }
        })
      }
      if(!this.helper.tracking){
        clearInterval(interval)
      }
    }, 2000)
  }

  openDialog(ref?: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
    });

    dialogRef.componentInstance.FieldsDialog = ref

    dialogRef.disableClose = true
  }

  badWayOne(error: string): void {
    console.log(1)
    this.greenLight = false
    let ref = {
      title: 'Prova interrompida.',
      type: 'one',
      login: false,
      one: error
    }
    this.openDialog(ref)
    let interval = setInterval(() => {
      this.camera.triggerSnapshot()
      this.user.Img = this.helper.webImg
      this.http.postValidar(this.user).subscribe((data) => {
        this._snakBar.open('Prova Liberada', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialog.closeAll()
        clearInterval(interval)
        this.greenLight = true
      })
    }, 1000)
  }

  badWayTwo(error: string): void {
    console.log(2)
    this.greenLight = false
    let ref = {
      title: 'Prova interrompida.',
      type: 'two',
      login: false,
      two: error
    }
    this.openDialog(ref)
    let interval = setInterval(() => {
      this.camera.triggerSnapshot()
      this.user.Img = this.helper.webImg
      this.http.postValidar(this.user).subscribe((data) => {
        this._snakBar.open('Prova Liberada', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialog.closeAll()
        clearInterval(interval)
        this.greenLight = true
      })
    }, 1000)
  }

}
