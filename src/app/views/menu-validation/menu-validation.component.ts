import { HelperService } from 'src/app/services/Helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-validation',
  templateUrl: './menu-validation.component.html',
  styleUrls: ['./menu-validation.component.css']
})
export class MenuValidationComponent implements OnInit {

  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit(): void {
    this.helper.loopShoot = false
  }

  toWebCamAt(): void {
    this.router.navigate(['/autenticar/ativo'])
  }
  toWebCamPac(): void {
    this.router.navigate(['/autenticar'])
  }

  onBack(): void {
    this.router.navigate(['/menu'])
  }


}
