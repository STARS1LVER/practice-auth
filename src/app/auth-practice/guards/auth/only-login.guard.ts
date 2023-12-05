import { inject } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take, tap } from 'rxjs';



// - Realizaremos un guard, y verificams si esta logado
export const onlyLoginGuard = () => {

  const autService = inject(AuthService)
  const router = inject(Router)
  return autService.userState$
  .pipe(
    // ! con el stake solo observamos una sola vez el estado de autenticacion y luego dejara de observar cambios
    take(1),
    tap((isLoggedIn) => (
      !!isLoggedIn ?  true: router.navigate(['/auth/login'])))

  )
};
