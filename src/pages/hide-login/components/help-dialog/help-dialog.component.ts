import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-help-dialog',
  imports: [MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.scss'
})
export class HelpDialogComponent {
  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
