import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  //si l'utisateur n'est pas connecté (pas de jwt dans le localStorage) alors on le redirige vers la page de login
  if (localStorage.getItem('jwt') == null) {
    const router = inject(Router);
    return router.parseUrl('/login');
  }

  return true;
};
