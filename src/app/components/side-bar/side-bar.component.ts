import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MapaDeQuestoesComponent } from './../mapa-de-questoes/mapa-de-questoes.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @ViewChild(MapaDeQuestoesComponent, { static: false })
  map!: MapaDeQuestoesComponent;


  @Output() skecth = new EventEmitter()
  @Output() toEnd = new EventEmitter()

  @Input() arrQuestion: any



  constructor() { }

  icons: any = [['menu', 'FECHAR'], ['apps', 'MAPA DE QUESTÕES'], ['edit', 'RASCUNHO'], ['check_circle', 'FINALIZAR']]
  closed: boolean = false
  isShowing: boolean = false
  sketchShow: boolean = false

  ngOnInit(): void {
  }

  openAndClose(event: boolean): void {
    this.closed = event
  }

  onEnd(): void {
    this.toEnd.emit()
  }

  showMap(): void {
    if (this.isShowing) {
      this.map.ShowMe(false)
      this.isShowing = false
    }
    else {
      this.map.ShowMe(true)
      this.isShowing = true
    }
  }

  openRascunho(event: any): void {
    switch (event) {
      case 1:
        this.sketchShow = true
        this.skecth.emit(1)
        break;
      case 2:
        this.skecth.emit(2)
        break;
      case 3:
        this.skecth.emit(3)
        break;
      case 4:
        this.skecth.emit(4)
        break;
      case 5:
        this.skecth.emit(5)
        break;
      case 0:
        this.sketchShow = false
        this.skecth.emit(0)
        break;

    }
  }

}
