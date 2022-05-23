import { FacesComponent } from './../faces/faces.component';
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
  
  @ViewChild(FacesComponent, { static: false })
  face!: FacesComponent;

  FieldsDialog: any = {}
  Measures: any = { height: 500, width: 490 }
  data: User = {}


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private http: HttpService,
    public helper: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    console.log(this.helper.random)
    if (this.FieldsDialog.type == 'cam') {
      let interval = setInterval(() => {
        this.camera.triggerSnapshot()
        this.data.Img = this.helper.webImg
        this.data.CPF = this.helper.cpf
        this.data.Senha = this.helper.senha
        if (!this.helper.authLogin) {
          this.http.postVivacidade(this.data).subscribe((data) => {
            this.helper.authLogin = true
            if (this.FieldsDialog.login) {
              this.onLogin()
              this.dialogRef.close()
            }
          }, (error) => {
            if (error.error.etapa1 == true)
              this.face.id1.style.fill = '#38FF1E'
            if (error.error.etapa2 == true)
              this.face.id2.style.fill = '#38FF1E'
            if (error.error.etapa3 == true)
              this.face.id3.style.fill = '#38FF1E'
          })
        }
        else {
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogin(): void {
    localStorage.setItem(btoa('token'), btoa('true'))
    this.router.navigate(['/autenticar'])
    this.helper.isLoading.next(false)
  }

}
