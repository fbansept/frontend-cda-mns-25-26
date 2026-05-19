import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

export const adminGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
     const router = inject(Router);
   
     //si l'utilisateur n'est pas connecté
     if (authService.jwtInfo() == null) {
       return router.parseUrl('/login');
     }
   
     //si l'utisateur n'est pas ADMIN
     if (authService.jwtInfo()?.role != 'ADMIN') {
       const notification = inject(NotificationService);
       notification.open(
         "Vous n'avez pas accès à cette page, connectez vous à un autre compte",
         'error',
       );
       return router.parseUrl('/login');
     }
   
     return true;
};
