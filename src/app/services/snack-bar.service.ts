import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnack(snack: { message: string,  duration?: number,}): void {
    this.snackBar.open(snack.message, "Close", { duration: snack.duration ? snack.duration : 5000, horizontalPosition: 'right', verticalPosition: 'top' })
  }
}
