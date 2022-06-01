import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-adm-space',
  templateUrl: './adm-space.component.html',
  styleUrls: ['./adm-space.component.css']
})
export class AdmSpaceComponent implements OnInit {

  constructor(private http: HttpService, private router: Router) { }
  //icons e titulos da sideBar
  side: any = [
    { name: "HOME", class: 'fa fa-light fa-house' },
    { name: "FOTOS", class: 'fa fa-regular fa-image' },
    { name: "SAIR", class: 'fa fa-light fa-arrow-left-long' },
  ];

  //variaveis de validacao
  toDangerous: boolean = false
  toWarning: boolean = false
  showPhoto: boolean = false
  showUser: boolean = false
  showLogs: boolean = false
  imagesWarning: any[] = []
  imagesDanger: any[] = []
  select: string = ''

  ngOnInit(): void {
    //get na lista de ocorrencias durante a prova
    this.http.getList().subscribe((data) => {
      data.listaPessoaNaoAutorizada.forEach((element: string) => {
        this.imagesDanger.push("data:image/png;base64," + element)
      });
      data.listaDuasPessoas.forEach((element: string) => {
        this.imagesWarning.push("data:image/png;base64," + element)
      });

      this.chartOption.dataset = {
        source: [
          ['type', 'Warning', 'Danger'],
          ["Logs", this.imagesWarning.length, this.imagesDanger.length],
        ]
      }

      this.data.push({ name: data.nome, position: 1, warnings: this.imagesWarning.length, dangerous: this.imagesDanger.length },)
    },
      (error) => {
      })
  }

  //criacao do primeiro grafico de barras
  chartOption: EChartsOption = {
    legend: { show: false },
    tooltip: {},
    dataset: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar', color: '#FFCC00' }, { type: 'bar', color: '#CC3300' }]
  };

  //criacao do segundo grafico em pizza
  chartOption2: EChartsOption = {
    title: {
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'Usuário',
        type: 'pie',
        radius: '80%',
        data: [
          { value: 1048, name: 'UseX' },
          { value: 735, name: 'UserY' },
          { value: 580, name: 'UserW' },
          { value: 484, name: 'UserZ' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  //configuracao das colunas da table
  dataConf: any = {
    displayedColumns: ['position', 'name', 'warnings', 'dangerous']
  }
  //instanciando a lista da table
  data: Element[] = [
  ]

  //metodo que validara quem foi clicado ao abrir as fotos do monitoramento
  test(value: string): void {
    this.showLogs = true
  }

  //metodo que valida qual opcao foi selecionada na side bar
  goToUser(value: string): void {
    if (value == 'FOTOS')
      this.showUser = true

    if (value == 'HOME') {
      this.showLogs = false
      this.showUser = false
      this.showPhoto = false
    }

    if (value == "SAIR") {
      this.router.navigate(['/'])
    }
  }
}

//interce para a data da table
export interface Element {
  name: string;
  position: number;
  warnings: number;
  dangerous: number;
}