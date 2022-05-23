import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  icons: any = [['menu', 'Fechar'],['apps', 'Mapa de questões'], ['edit', 'Rascunho'], ['check_circle' , 'Finalizar']]
  closed: boolean = false

  ngOnInit(): void {
  }

  openAndClose(event: boolean): void {
    this.closed = event
  }

}
