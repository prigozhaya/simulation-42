import { Route } from '@angular/router';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
