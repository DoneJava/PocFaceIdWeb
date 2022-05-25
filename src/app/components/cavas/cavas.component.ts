import { Component, ViewChild } from '@angular/core';
import { PaintableComponent } from 'paintablejs/angular';


@Component({
  selector: 'app-cavas',
  templateUrl: './cavas.component.html',
  styleUrls: ['./cavas.component.css']
})
export class CavasComponent {

  @ViewChild(PaintableComponent)
  paintable!: PaintableComponent;

  active = false;
  useEraser = false;
  thickness = 5;
  color = '#FF0000';
  question: string = ''

  clear() {
    this.paintable?.clear();
  }

  undo() {
    this.paintable?.undo();
  }

  redo() {
    this.paintable?.redo();
  }

  toggleEdit() {
    this.useEraser = false;
    this.active = !this.active;
  }

  toggleUseEraser() {
    this.useEraser = !this.useEraser;
  }

  get image() {
    return localStorage.getItem('/') || undefined;
  }

  onSave(image: string) {
    localStorage.setItem(btoa(this.question), btoa(image));
  }

  onLongPress() {
    console.log('longpress');
  }

  manageImage(number: string): void {
    this.question = number
    this.onSave
  }

}