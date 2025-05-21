import { Route } from '@angular/router';
import { DefaultPageComponent } from '../pages/default-page/default-page.component';
import { HideLoginComponent } from '../pages/hide-login/hide-login.component';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { MySpaceComponent } from '../pages/my-space/my-space.component';
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
    path: 'hideLogin',
    component: HideLoginComponent,
  },
  {
    path: 'mySpace',
    component: MySpaceComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
