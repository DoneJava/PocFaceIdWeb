import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitize: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('front', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/reto.svg'))
    this.iconRegistry.addSvgIcon('dir1', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/dir1.svg'))
    this.iconRegistry.addSvgIcon('dir2', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/dir2.svg'))
    this.iconRegistry.addSvgIcon('esq1', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/esq1.svg'))
    this.iconRegistry.addSvgIcon('esq2', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/esq2.svg'))
    this.iconRegistry.addSvgIcon('cima1', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/cima1.svg'))
    this.iconRegistry.addSvgIcon('cima2', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/cima2.svg'))
    this.iconRegistry.addSvgIcon('baixo1', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/baixo1.svg'))
    this.iconRegistry.addSvgIcon('baixo2', this.sanitize.bypassSecurityTrustResourceUrl('assets/img/svgs/baixo2.svg'))
  }
  
  @Input() direction: string = ''

  dir: any[] = [['front', 'id1'], ['dir1', 'id2'] , ['dir2', 'id3']]
  esq: any[] = [['front', 'id1'], ['esq1', 'id2'] , ['esq2', 'id3']]
  cima: any[] = [['front', 'id1'], ['cima1', 'id2'] , ['cima2', 'id3']]
  baixo: any[] = [['front', 'id1'], ['baixo1', 'id2'] , ['baixo2', 'id3']]

  ref: any[] = []
  id1:any
  id2:any
  id3:any


  ngOnInit(): void {
    switch(this.direction){
      case 'Vire o rosto para cima.':
        this.ref = this.cima
        break;
      case 'Vire o rosto para esquerda.':
        this.ref = this.esq
        break;
      case 'Vire o rosto para baixo.':
        this.ref = this.baixo
        break;
      case 'Vire o rosto para direta.':
        this.ref = this.dir
        break;
    }
  }

  ngAfterViewInit(): void {
    this.id1 = document.getElementById('id1')
    this.id2 = document.getElementById('id2')
    this.id3 = document.getElementById('id3')
  }

}
