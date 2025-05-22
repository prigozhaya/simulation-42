import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DocumentsDialogService } from '../../../../app/services/dialog-communication.service';
interface PdfDocument {
  id: number
  name: string
  date: string
  size: string
  icon: string
}
@Component({
  selector: 'app-documents-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,],
  templateUrl: './documents-dialog.component.html',
  styleUrl: './documents-dialog.component.scss'
})
export class DocumentsDialogComponent {

  private documentsDialogService = inject(DocumentsDialogService);

  documents: PdfDocument[] = [
    {
      id: 1,
      name: "Отчёт №1.pdf",
      date: "14/02",
      size: "40 KB",
      icon: "description",
    },
    {
      id: 2,
      name: "Отчёт №2.pdf",
      date: "05/03",
      size: "43 KB",
      icon: "description",
    },
    {
      id: 3,
      name: "Отчёт №3.pdf",
      date: "228/03",
      size: "52 KB",
      icon: "description",
    },
    {
      id: 4,
      name: "Иcследование █████████ ███.pdf",
      date: "/",
      size: "0.9 MB",
      icon: "description",
    },
  ]

  constructor(public dialogRef: MatDialogRef<DocumentsDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close()
    this.documentsDialogService.closeDialog(true)
  }

  openDocument(document: PdfDocument): void {
    const pdfUrl = `/${document.name}`

    window.open(pdfUrl, "_blank")

  }
}
