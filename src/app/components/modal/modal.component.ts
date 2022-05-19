import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from './../../interfaces/user';
import { HelperService } from './../../services/helper.service';
import { HttpService } from './../../services/http.service';
import { CameraComponent } from './../camera/camera.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild(CameraComponent, { static: false })
  camera!: CameraComponent;

  FieldsDialog: any = {}
  Measures: any = { height: 500, width: 490 }
  data: User = {}


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private http: HttpService,
    private helper: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.FieldsDialog.type == 'cam') {
      this.http.getRandom().subscribe((data) => { this.FieldsDialog.randomMessage = data.mensagemResposta }, (error) => { })

      let interval = setInterval(() => {
        this.camera.triggerSnapshot()
        this.data.Img = this.helper.webImg
        this.data.CPF = this.helper.cpf
        this.data.Senha = this.helper.senha
        if (!this.helper.authLogin) {
          this.http.postVivacidade(this.data).subscribe((data) => {
            this.helper.authLogin = true
            if(this.FieldsDialog.login){
              this.onLogin()
              this.dialogRef.close()
            }
          }, (error) => {
            console.log(error)
          })
        }
        else{
          clearInterval(interval)
        }
      }, 1000)


    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogin():void {
    localStorage.setItem('token', 'true')
    this.router.navigate(['/autenticar'])
    this.helper.isLoading.next(false)
  }

}
