import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/Helper.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(private helper: HelperService) { }

  imgBD: any
  timeIsOver: boolean = false

  ngOnInit(): void {
    if (this.helper.imgBD != undefined)
      this.imgBD = this.helper.imgBD
    else
      this.imgBD = localStorage.getItem('foto')

  }

}
