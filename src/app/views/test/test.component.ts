import { HelperService } from './../../services/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  prova: any = [
    {
      numero: '01',
      titulo: 'A produção de biocombustíveis vem despertando interesses e aplicações em diversos países. No Brasil, tem sido muito discutida atualmente a produção de um biocombustível que tem como fonte um produto agrícola. Trata-se da(o):',
      respostas: [ ['A', 'Gasolina'], ["B", 'acetona'], ["C", 'paracetamol'],["D", 'etanol'] ]
    },
    {
      numero: '02',
      titulo: 'Em 2006, o IBGE completou 70 anos de sua fundação. Esse instituto foi criado no contexto histórico da(o):',
      respostas: [ ["A", 'Ditadura Militar, de Costa e Silva'], ["B", 'Transição Democrática, de José Sarney'], ["C", 'Estado Novo, de Getúlio Vargas'], ["D", 'Plano de Metas, de Juscelino Kubitschek'] ]
    },
    {
      numero: '03',
      titulo: 'Em 2007 foi lançado no Brasil o PAC Programa de Aceleração do Crescimento. A execução desse programa tem uma abrangência:',
      respostas: [ ["A", 'distrital'], ["B", 'municipal'], ["C", 'estadual'], ["B", 'nacional'] ]
    },
    {
      numero: '04',
      titulo: 'O relatório sobre a epidemia divulgado [em dezembro de 2010] mostra que o número de infecções pelo vírus caiu quase 20% nos últimos dez anos. O estudo do programa das Nações Unidas que coordena a campanha de combate à doença ressalta um fato inédito: pela primeira vez, a queda do número de novas infecções está ligada à disseminação do conhecimento sobre o vírus [causador da doença].',
      respostas: [ ["A", 'aids'], ["B", 'malária'], ["C", 'poliomielite'], ["D", 'varíola'] ]
    }
  ]

  constructor(
    public helper: HelperService
  ) { }

  ngOnInit(): void {
  }


}
