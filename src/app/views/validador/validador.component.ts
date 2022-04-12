import { AxiosService } from './../../services/axios.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ImgService } from './../../services/img.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
})
export class ValidadorComponent implements OnInit {
  // toggle webcam on/off
  public Autenticando = 'Autenticando...';
  public img = this.user.imgBD
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  constructor(private user: ImgService, private axios: AxiosService) {}
  ngOnInit(): void {
    setInterval(() => {
      this.trigger.next();

    }, 10000);
  }
  data: User = {
    name: '',
    cpf: '',
    password: '',
    img: '',
  };
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.data.img = webcamImage.imageAsDataUrl;
    this.data.cpf = this.user.cpf
    this.data.password = this.user.senha
    this.axios
      .postAutenticar(this.data)
      .then(res => (this.Autenticando = res.data))
      .catch(res => (this.Autenticando = res.data));
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
}
