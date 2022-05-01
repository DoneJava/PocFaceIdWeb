import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { observable, Observable, Subscriber } from 'rxjs';
import { HelperService } from 'src/app/services/Helper.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Output() imgBase64 = new EventEmitter

  constructor(public helper: HelperService) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File): void {
    this.helper.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
      this.imgBase64.emit(filereader.result)
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
}
