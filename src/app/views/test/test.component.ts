import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { HelperService } from '../../services/helper.service';
import { CavasComponent } from './../../components/cavas/cavas.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //Criacao da prova mocada
  prova: any = [
    {
      numero: '01',
      titulo: 'A produção de biocombustíveis vem despertando interesses e aplicações em diversos países. No Brasil, tem sido muito discutida atualmente a produção de um biocombustível que tem como fonte um produto agrícola. Trata-se da(o):',
      respostas: [['A', 'Gasolina'], ["B", 'acetona'], ["C", 'paracetamol'], ["D", 'etanol']]
    },
    {
      numero: '02',
      titulo: 'Em 2006, o IBGE completou 70 anos de sua fundação. Esse instituto foi criado no contexto histórico da(o):',
      respostas: [["A", 'Ditadura Militar, de Costa e Silva'], ["B", 'Transição Democrática, de José Sarney'], ["C", 'Estado Novo, de Getúlio Vargas'], ["D", 'Plano de Metas, de Juscelino Kubitschek']]
    },
    {
      numero: '03',
      titulo: 'Em 2007 foi lançado no Brasil o PAC Programa de Aceleração do Crescimento. A execução desse programa tem uma abrangência:',
      respostas: [["A", 'distrital'], ["B", 'municipal'], ["C", 'estadual'], ["D", 'nacional']]
    },
    {
      numero: '04',
      titulo: 'O relatório sobre a epidemia divulgado [em dezembro de 2010] mostra que o número de infecções pelo vírus caiu quase 20% nos últimos dez anos. O estudo do programa das Nações Unidas que coordena a campanha de combate à doença ressalta um fato inédito: pela primeira vez, a queda do número de novas infecções está ligada à disseminação do conhecimento sobre o vírus [causador da doença].',
      respostas: [["A", 'aids'], ["B", 'malária'], ["C", 'poliomielite'], ["D", 'varíola']]
    }
  ]
  
  //Instanciando decorator de propriedade para consulta de exibicao do canvas
  @ViewChild(CavasComponent, { static: false })
  canvas!: CavasComponent;

  //Instanciando variveis de controle
  numQuest: number = 0
  pushed: boolean = false
  mapShow: boolean = false
  nextEnd: boolean = false
  isDisabled: boolean = false
  isFinished: boolean = false
  semAgradecimentos: boolean = true
  arrQuestion: any[] = [[0, ''], [1, ''], [2, ''], [3, '']]
  imgFinal: string = this.helper.imgBD ? this.helper.imgBD : atob(String(localStorage.getItem(btoa('imgBD'))))
  nomeFinal: string = this.helper.nome ? this.helper.nome : atob(String(localStorage.getItem(btoa('nome'))))
  cpfFinal: string = this.helper.cpf ? this.helper.cpf : atob(String(localStorage.getItem(btoa('CPF'))))

  constructor(
    public helper: HelperService,
    public dialog: MatDialog,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //Travando o botao de volta
    this.changeButton('back', true)
    //Dando inicio ao monitoramento
    this.helper.tracking = true
  }

  //Metodo que realiza a marcacao da prova
  onClick(mark: string, question: number): void {
    this.arrQuestion.forEach(element => {
      if (element[0] == question && element[1] == '') {
        element[1] = mark
        this.pushed = true
        let div2 = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
        div2.style.border = '2px solid #00fd00'
      }
      else if (element[0] == question && element[1] != mark) {
        let div = document.getElementById(element[1]) as HTMLDivElement
        div.style.border = 'none'
        element[1] = mark
        this.pushed = true
        let div2 = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
        div2.style.border = '2px solid #00fd00'
      }
      else if (element[0] == question && element[1] == mark) {
        let div = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
        div.style.border = '2px solid #00fd00'
        this.pushed = true
      }
    });
    if (this.pushed == false) {
      this.arrQuestion.push([question, mark])
      let div = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
      div.style.border = '2px solid #00fd00'
    }
    this.pushed = false

    this.cdr.detectChanges()
  }

  //Metodo que desmarca a questão
  onUnMark(question: number): void {
    for (let i = 0; i < this.arrQuestion.length; i++) {
      if (this.arrQuestion[i][0] == question) {
        document.getElementById(this.arrQuestion[this.numQuest][1])!.style.border = 'none'
        this.arrQuestion[i][1] = ''
      }
    }
  }

  //Metodo que passa de questao
  nextQuestion(): void {
    if (this.numQuest == 0) {
      this.changeButton('back', false)
    }
    if (this.numQuest < this.prova.length - 1) {
      this.numQuest++
    }
    if (this.nextEnd) {
      this.isFinished = true
    }
    if (this.numQuest == this.prova.length - 1) {
      this.changeButton('next', true)
      this.nextEnd = true
    }

    this.onSkecth(0)
    this.onSkecth(3)

    this.cdr.detectChanges()
    if (this.arrQuestion[this.numQuest]) {
      let div = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
      div.style.border = '2px solid #00fd00'
    }
  }

  //Metodo que volta de questao
  backQuestion(): void {
    if (this.numQuest == this.prova.length - 1) {
      this.changeButton('next', false)
      this.nextEnd = false
    }
    if (this.numQuest - 1 == 0) {
      this.numQuest--
      this.changeButton('back', true)
    } else {
      this.numQuest--
    }
    this.cdr.detectChanges()

    if (this.arrQuestion.length - 1 >= this.numQuest) {
      let div = document.getElementById(this.arrQuestion[this.numQuest][1]) as HTMLDivElement
      div.style.border = '2px solid #00fd00'
    }
  }

  //Metodo que volta a prova do final
  backFromEnd(): void {
    this.isFinished = false
    this.nextEnd = true
    this.cdr.detectChanges()
    this.changeButton('next', true)
    document.getElementById(this.arrQuestion[this.numQuest][1])!.style.border = '2px solid #00fd00'
  }

  //Metodo que troca a cor e forma dos botões
  changeButton(button: string, color: boolean): void {
    switch (button) {
      case 'next':
        switch (color) {
          case true:
            let button = document.getElementById('next') as HTMLButtonElement
            button.innerHTML = "Finalizar"
            button.style.backgroundColor = 'rgb(102, 176, 242)'
            button.style.color = 'white'
            break;
          case false:
            let button2 = document.getElementById('next') as HTMLButtonElement
            button2.innerHTML = "Avançar"
            button2.style.backgroundColor = 'white'
            button2.style.color = 'black'
            break;
        }
        break;
      case 'back':
        switch (color) {
          case true:
            this.isDisabled = true
            break;
          case false:
            this.isDisabled = false
            break;
        }
        break;
    }
  }

  //Metodo que finaliza o modulo da prova
  endTest(): void {
    this.helper.tracking = false
    this.router.navigate(['/'])
    localStorage.clear()
  }

  //Metodo de finalizacao pela sideBar
  endFromSide(): void {
    this.isFinished = true
  }

  //Metodo para abrir o mapa de questoes
  onMapShow(event: boolean): void {
    this.mapShow = event
  }

  //Metodo para utilizar o rascunho
  onSkecth(event: any): void {
    switch(event){
      case 1:
        this.canvas.toggleEdit()
        break;
      case 2:
        this.canvas.toggleUseEraser()
        break;
      case 3:
        this.canvas.clear()
        break;
      case 4:
        this.canvas.redo()
        break;
      case 5:
        this.canvas.undo()
        break;
      case 0:
        this.canvas.manageImage(String(this.numQuest))
        this.canvas.toggleEdit()
    }
  }

}
