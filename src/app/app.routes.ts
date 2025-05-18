import { Route } from '@angular/router';
import { DefaultPageComponent } from '../pages/default-page/default-page.component';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

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
    path: 'mаin',
    component: DefaultPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
