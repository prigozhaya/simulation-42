import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  host: { class: 'background' }
})
export class NotFoundComponent {
 private router = inject(Router);
public smoke = signal(false);

constructor() {
  effect(() => {
    console.log(this.smoke());
  })
}

public startSmoke() {
  if(this.smoke()) return
  this.smoke.set(true);
  setTimeout(() => {
    this.smoke.set(false);
  }, 2000);
}

public navigate(){
this.router.navigate(['main']);
}
}
