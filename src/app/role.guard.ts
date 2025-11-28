import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRol = localStorage.getItem('rol');
  const allowedRoles = route.data?.['roles'] as string[];
  
  if (!userRol) {
    router.navigate(['/auth/login']);
    return false;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRol)) {
    router.navigate(['/']);
    return false;
  }
  
  return true;
};