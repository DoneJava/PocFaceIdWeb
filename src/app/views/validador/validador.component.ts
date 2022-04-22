import { AxiosService } from './../../services/axios.service';
import { ImgService } from './../../services/img.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
})
export class ValidadorComponent implements OnInit {
  
  public img = this.user.imgBD

  @Input() func: Function = () => {}
  
  private trigger: Subject<void> = new Subject<void>();
  constructor(private user: ImgService, private axios: AxiosService) {}
  ngOnInit(): void {
    /* setInterval(() => {
      this.triggerSnapshot();
      console.log(123)
    }, 1000); */
    console.log(this.func)
  }
  data: User = {
    name: '',
    cpf: '',
    password: '',
    img: '',
  };
}
