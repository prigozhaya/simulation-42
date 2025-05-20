import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog',
  imports: [MatDialogModule,
    MatRippleModule,],
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.scss'
})
export class HelpDialogComponent {
  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
