import { Validators } from '@angular/forms';
import { Component, Output, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { CpfValidatorService } from 'src/app/services/cpf-validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  //Output para informar ao formulário quais campos gerar.
  @Output() formFields: any = {
    inputs: [
      { show: 'Nome e Sobrenome', name: 'name', type: 'text', class: 'name' },
      { show: 'CPF', name: 'cpf', type: 'text', class: 'cpf', mask: '000.000.000-99' },
      { show: 'Senha', name: 'password', type: 'password', class: 'password' },
      { show: 'Confirmação de senha', name: 'passwordConfimation', type: 'password', class: 'passwordConfimation' },
    ],
    formGroup: {
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\u00C0-\\u017F´]+\\s+[a-zA-Z\\u00C0-\\u017F´]{0,}$')]],
      cpf: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfimation: [null, Validators.required]
    }
  }

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router,
    public dialog: MatDialog,
    public helper: HelperService,
    private cpf: CpfValidatorService
  ) { }

  ngOnInit(): void {
    //Informa ao componente camera que ele não precisa iniciar loop de fotos
    this.helper.loopShoot = false
  }

  //Verifica se há alguma foto
  returnImg(): boolean {
    if (this.helper.webImg)
      return true
    else
      return false
  }

  //Recebe formulário do app-formulário e envia para api
  listenerForm(event: any) {
    if(event.valid){
      if (!this.cpf.CpfValidator(event)) {
        this._snackBar.open('CPF inválido.', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
      else if (!this.helper.webImg) {
        this._snackBar.open('A foto é obrigatória.', 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
      else if (event.valid) {
        this.helper.isLoading.next(true)
        event.value.img = this.helper.webImg
  
        this.http.putUser(event.value).subscribe((data) => {
          this.helper.isLoading.next(false)
          this._snackBar.open('Registro feito com sucesso!', 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['']);
          this.helper.webImg = ''
        }, (error) => {
          this.helper.isLoading.next(false)
          this._snackBar.open('Erro ao efetuar registro.', 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        })
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '900px'
    });
  }
}
