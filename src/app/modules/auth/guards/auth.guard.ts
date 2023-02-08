import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }

  canActivate(): boolean {
    const authenticated = this.authService.authenticated();

    if (!authenticated)
      this.router.navigate(['/auth']);

    return authenticated;
  }
}
