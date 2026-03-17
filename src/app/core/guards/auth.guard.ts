import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { from, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return from(auth.ensureAuthenticated()).pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['/login']);
      }

      return auth.hasRole('ADMIN') ? true : router.createUrlTree(['/']);
    })
  );
};
