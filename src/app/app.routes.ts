import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/pages/home/home.component';
import { ContactoComponent } from './features/public/pages/contacto/contacto.component';
import { NosotrosComponent } from './features/public/pages/nosotros/nosotros.component';
import { FavouritesComponent } from './features/user/pages/favourites/favourites.component';
import { FollowersComponent } from './features/user/pages/followers/followers.component';
import { WarningsComponent } from './features/moderator/pages/warnings/warnings.component';
import { CategoriesComponent } from './features/administrator/pages/categories/categories.component';
import { UsersMaintenanceComponent } from './features/administrator/pages/users-maintenance/users-maintenance.component';
import { CreatePostComponent } from './features/shared-pages/create-post/create-post.component';
import { NotificationsComponent } from './features/shared-pages/notifications/notifications.component';
import { ProfileComponent } from './features/shared-pages/profile/profile.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';

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

];
