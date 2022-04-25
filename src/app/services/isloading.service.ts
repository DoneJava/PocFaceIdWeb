import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloadingService {

  constructor() { }

  public isLoading = new BehaviorSubject<Boolean>(false)

}
