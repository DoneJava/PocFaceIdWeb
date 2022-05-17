import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formFields: any = {};

  @Output() FormEmiter = new EventEmitter();
  @Output() linkClick = new EventEmitter();

  constructor(private builder: FormBuilder) { }

  formulario: any = {}

  ngOnInit(): void {
    this.formulario = this.builder.group(this.formFields.formGroup)
  }

  getErrorMessage() {
    if (this.formulario.hasError('required')) {
      return 'Você deve inserir um valor';
    }

    return  this.formulario.hasError('cpf') ? 'CPF inválido' : '';
  }

  onSubmit() {
    this.FormEmiter.emit(this.formulario)
  }

  emitClick(): void {
    this.linkClick.emit(true)
  }
}
