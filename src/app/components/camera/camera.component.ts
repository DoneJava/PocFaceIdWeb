import { ImgService } from './../../services/img.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { TakePhotoService } from 'src/app/services/take-photo.service';
import { Interceptor } from 'src/app/interceptors/interceptor.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})

export class CameraComponent implements OnInit {

  constructor(
    private ImgService: ImgService, 
    private takingShoot: TakePhotoService,
    private wating: Interceptor
    ) {

  }
  @Output() PicWasTaken = new EventEmitter();

  @Input() isActivated: boolean = true
  @Input() Measusres: any = {}

  public showWebcam = true;
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
      
    );
    
    if (this.takingShoot.loopShoot){
      setInterval(() => {
        if(this.wating.cont.getValue() === 0){
          this.triggerSnapshot()}
      }, 5000);
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public handleImage(webcamImage: WebcamImage): void {
  
    this.ImgService.webImg = webcamImage.imageAsDataUrl;
    this.PicWasTaken.emit(true)
  }
  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
