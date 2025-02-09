import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const authenticated = this.authService.authenticated;

        if (authenticated) {
            return true;
        }

        this.router.navigate(['/login']);

        return false;
    }
}
