import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  //si l'utisateur n'est pas connecté
  if (
    authService.jwtInfo()?.role != 'USER' &&
    authService.jwtInfo()?.role != 'SUPPLIER' &&
    authService.jwtInfo()?.role != 'ADMIN'
  ) {
    const router = inject(Router);

    return router.parseUrl('/login');
  }

  return true;
};
