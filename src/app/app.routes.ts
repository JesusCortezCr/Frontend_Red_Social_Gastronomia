import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './role.guard';

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

  // Rutas para el rol usuario
  {
    path:'user',
    loadComponent:()=> import('./layout/user-layout/user-layout/user-layout.component').then(m=>m.UserLayoutComponent),
    canActivate: [authGuard,roleGuard],
    data:{roles : ['ROLE_USUARIO']},
    children:[
      {path:'',loadComponent:()=> import('./features/user/pages/home-user/home-user.component').then(m=>m.HomeUserComponent),title: 'Dashboard Usuario'},
      {path:'publicaciones',loadComponent:()=> import('./features/user/pages/home-user/home-user.component').then(m=>m.HomeUserComponent),title:'Publicaciones'},
      {path:'notificaciones',loadComponent:()=>import('./features/shared-pages/notifications/notifications.component').then(m=>m.NotificationsComponent),title:'Notificaciones'},
      {path:'perfil',loadComponent:()=>import('./features/shared-pages/profile/profile.component').then(m=>m.ProfileComponent),title:'Mi perfil'},
      {path:'mis-publicaciones',loadComponent:()=>import('./features/user/pages/my-publication/my-publication.component').then(m=>m.MyPublicationComponent),title:'Mis publicaciones'},
      {path:'crear-publicacion',loadComponent:()=>import('./features/shared-pages/create-post/create-post.component').then(m=>m.CreatePostComponent),title:'Crear publicacion'},
    ]
  },

  // RUTAS PARA MODERADOR
{
    path: 'moderador',
    loadComponent: () => import('./layout/user-layout/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_MODERADOR'] },
    children: [
      { path: '', loadComponent: () => import('./features/shared-pages/home-post/home-post.component').then(m => m.HomePostComponent), title: 'Gestión Publicaciones' },
      { path: 'publicaciones', loadComponent: () => import('./features/shared-pages/home-post/home-post.component').then(m => m.HomePostComponent), title: 'Gestión Publicaciones' },
      { path: 'notificaciones', loadComponent: () => import('./features/shared-pages/notifications/notifications.component').then(m => m.NotificationsComponent), title: 'Notificaciones' },
      { path: 'perfil', loadComponent: () => import('./features/shared-pages/profile/profile.component').then(m => m.ProfileComponent), title: 'Mi Perfil' },
      { path: 'crear-publicacion', loadComponent: () => import('./features/shared-pages/create-post/create-post.component').then(m => m.CreatePostComponent), title: 'Crear Publicación' }
    ]
  },

  // RUTAS PARA ADMINISTRADOR
{
    path: 'administrador',
    loadComponent: () => import('./layout/user-layout/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] },
    children: [
      { path: '', loadComponent: () => import('./features/administrator/pages/users-maintenance/users-maintenance.component').then(m => m.UsersMaintenanceComponent), title: 'Mantenimiento de cuentas' },
      { path: 'mantenimiento-usuarios', loadComponent: () => import('./features/administrator/pages/users-maintenance/users-maintenance.component').then(m => m.UsersMaintenanceComponent), title: 'Mantenimiento de cuentas' },
      { path: 'notificaciones', loadComponent: () => import('./features/shared-pages/notifications/notifications.component').then(m => m.NotificationsComponent), title: 'Notificaciones' },
      { path: 'perfil', loadComponent: () => import('./features/shared-pages/profile/profile.component').then(m => m.ProfileComponent), title: 'Mi Perfil' },
      { path: 'crear-categoria', loadComponent: () => import('./features/administrator/pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Crear categoria' }
    ]
  },



  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent),title: 'Pagina no encontrada'
  }

];
