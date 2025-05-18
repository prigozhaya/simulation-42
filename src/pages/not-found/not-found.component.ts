import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { VisitPageService } from '../../app/services/visit-page.service';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  host: { class: 'background' }
})
export class NotFoundComponent implements OnInit {
  private router = inject(Router);
  private visitflagService = inject(VisitPageService);
  public smoke = signal(false);


  // constructor() {
  //   effect(() => {
  //     console.log(this.smoke());
  //   })
  // }

  history: string[] = [];

  ngOnInit(): void {
    this.visitflagService.setFlag("notfound", true);
  }

  public startSmoke() {
    if (this.smoke()) return
    this.smoke.set(true);
    setTimeout(() => {
      this.smoke.set(false);
    }, 2000);
  }

  public navigate() {
    this.router.navigate(['main']);
  }
}
