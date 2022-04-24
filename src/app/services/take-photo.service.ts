import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakePhotoService {

  constructor() { }

  public loopShoot: boolean = false

}
