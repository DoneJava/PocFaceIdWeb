import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamMirrorProperties, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Interceptor } from 'src/app/interceptors/interceptor.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})

export class CameraComponent implements OnInit, AfterViewInit {

  constructor(
    private helper: HelperService,
    private wating: Interceptor
  ) {

  }
  @Output() PicWasTaken = new EventEmitter();

  @Input() needTitle: boolean = false
  @Input() isActivated: boolean = true
  @Input() Measusres: any = {}


  public cont = 1
  public showWebcam = true;
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  public mirrorImage: string | WebcamMirrorProperties = 'always'

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );



  }
  ngAfterViewInit(): void {
    this.takeInLoop()
  }

  takeInLoop() {
    /* setTimeout(() => {this.triggerSnapshot()}, 5000)  */

    if (this.helper.loopShoot) {
      setTimeout(() => {
        var shoot = setInterval(() => {
          if (this.wating.cont.getValue() === 0 && this.helper.loopShoot) {
            this.triggerSnapshot()
          }
          else {
            clearInterval(shoot)
          }
        }, 1000);
      }, 2000)
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
    this.helper.webImg = webcamImage.imageAsDataUrl;
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
