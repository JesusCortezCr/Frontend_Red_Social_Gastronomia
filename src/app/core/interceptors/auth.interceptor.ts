import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('🔐 [INTERCEPTOR] URL:', req.url);
  console.log('🔐 [INTERCEPTOR] Token encontrado:', !!token);
  console.log('🔐 [INTERCEPTOR] Token valor:', token);

  if (token && token !== 'null' && token !== 'undefined') {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log('✅ [INTERCEPTOR] Token agregado a headers');
    return next(cloned);
  }

  console.log('❌ [INTERCEPTOR] No se agregó token');
  return next(req);
};
