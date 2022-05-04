import { HelperService } from 'src/app/services/Helper.service';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private http: HttpService, private helper: HelperService) { }

  ngOnInit(): void {
  }

  toPicture(): void {
    this.router.navigate(['/compare'])
  }
  toWebCam(): void {

    this.http.getRandom().subscribe((data) => {
      this.helper.message = data.mensagemResposta
      this.helper.random = data.numero
      this.router.navigate(['autenticar/ativo'])
    },
     (error) => {
       console.log(error)
     })

    
  }

}
