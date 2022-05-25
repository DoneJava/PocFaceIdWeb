import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-de-questoes',
  templateUrl: './mapa-de-questoes.component.html',
  styleUrls: ['./mapa-de-questoes.component.css']
})
export class MapaDeQuestoesComponent implements OnInit {

  @Input() questions: any

  onShow: any = false

  

  constructor() { }

  ngOnInit(): void {
  }


  ShowMe(event: boolean):void {
    this.onShow = event
  }


}
