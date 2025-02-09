import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadComponent: () => import('./core/pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: '**',
        canActivate: [AuthGuard],
        redirectTo: '',
      },
];
