import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginInputDto, ResponseSignIn } from '../../models/auth/auth';
import { ResponseBase } from '../../../shared/response-base';
import { TokenMethodsUtils } from '../../../shared/token-methods';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly LOGIN_URL = 'http://localhost:5000' + '/api/v1/sisand-test/login';
    private readonly REFRESH_API_URL = 'http://localhost:5000' + '/api/v1/sisand-test/refresh';

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    signIn(loginInputDto: LoginInputDto): Observable<ResponseBase<ResponseSignIn>> {
        return this.httpClient.post<ResponseBase<ResponseSignIn>>(`${this.LOGIN_URL}`, loginInputDto);
    }

    refreshToken(refreshToken: string): Observable<ResponseBase<ResponseSignIn>> {
        let params = new HttpParams().append('refreshToken', refreshToken);
        return this.httpClient.post<ResponseBase<ResponseSignIn>>(
            this.REFRESH_API_URL,
            { refreshToken },
            httpOptions
        );
    }

    logout(): void {
        TokenMethodsUtils.signOut();
        this.router.navigate(['/login']);
    }

    get authenticated(): boolean {
        return TokenMethodsUtils.getToken() ? true : false;
    }
}
