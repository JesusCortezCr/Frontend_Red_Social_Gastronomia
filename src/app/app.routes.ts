import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas publicas
  {
    path: '',
    loadComponent: () => import('./layout/public-layout/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/public/pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'contacto', loadComponent: () => import('./features/public/pages/contacto/contacto.component').then(m => m.ContactoComponent), title: 'Contacto' },
      { path: 'nosotros', loadComponent: () => import('./features/public/pages/nosotros/nosotros.component').then(m => m.NosotrosComponent), title: 'Nosotros' },
      { path: 'auth/login', loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'auth/register', loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent), title: 'Registro' },
    ],
  },
  {
    path:'user',
    loadComponent:()=> import('./layout/user-layout/user-layout/user-layout.component').then(m=>m.UserLayoutComponent),
    canActivate: [authGuard],
    children:[
      {path:'',loadComponent:()=> import('./features/user/pages/home-user/home-user.component').then(m=>m.HomeUserComponent)}
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent),
  }

];
