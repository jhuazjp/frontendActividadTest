import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home-page/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/public/about-page/about-page.component').then((m) => m.AboutPageComponent)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./features/public/catalog-page/catalog-page.component').then((m) => m.CatalogPageComponent)
  },
  {
    path: 'designs',
    loadComponent: () =>
      import('./features/public/designs-page/designs-page.component').then((m) => m.DesignsPageComponent)
  },
  {
    path: 'artists',
    loadComponent: () => import('./features/public/artists-page/artists-page.component').then((m) => m.ArtistsPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/public/contact-page/contact-page.component').then((m) => m.ContactPageComponent)
  },
  {
    path: 'connect',
    pathMatch: 'full',
    redirectTo: 'contact'
  },
  {
    path: 'portfolio',
    pathMatch: 'full',
    redirectTo: 'catalog'
  },
  {
    path: 'available-designs',
    pathMatch: 'full',
    redirectTo: 'designs'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-page/login-page.component').then((m) => m.LoginPageComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
