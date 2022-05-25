import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-adm-space',
  templateUrl: './adm-space.component.html',
  styleUrls: ['./adm-space.component.css']
})
export class AdmSpaceComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getList().subscribe( data => console.log(data))
  }

}
