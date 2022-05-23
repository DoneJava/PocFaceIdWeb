import { MapaDeQuestoesComponent } from './../mapa-de-questoes/mapa-de-questoes.component';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @ViewChild(MapaDeQuestoesComponent, { static: false })
  map!: MapaDeQuestoesComponent;

  @Output() toEnd = new EventEmitter()

  @Input() arrQuestion: any
  isShowing: boolean = false

  constructor() { }

  icons: any = [['menu', 'Fechar'],['apps', 'Mapa de questões'], ['edit', 'Rascunho'], ['check_circle' , 'Finalizar']]
  closed: boolean = false

  ngOnInit(): void {
  }

  openAndClose(event: boolean): void {
    this.closed = event
  }

  onEnd(): void {
    this.toEnd.emit()
  }

  showMap():void {
    if(this.isShowing){
      this.map.ShowMe(false)
      this.isShowing = false
    }
    else{
      this.map.ShowMe(true)
      this.isShowing = true
    }
  }

}
