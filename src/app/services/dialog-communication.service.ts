import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsDialogService {

  private closeDialogSource = new BehaviorSubject<boolean>(false);
  closeDialog$ = this.closeDialogSource.asObservable();

  closeDialog(state: boolean): void {
    this.closeDialogSource.next(state);
  }

}