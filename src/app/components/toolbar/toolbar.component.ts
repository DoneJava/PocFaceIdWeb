import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit(): void {
  }

  exit(): void {
    localStorage.clear()
    this.helper.webImg = '';
    this.helper.cpf = null;
    this.helper.senha = null;
    this.router.navigate(['/'])
  }


}
