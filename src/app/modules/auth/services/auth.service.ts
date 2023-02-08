import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private static TOKEN_KEY = "L4D2_PLAYSTATS_TOKEN";

    authenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    setToken(token: string) {
        localStorage.setItem(AuthService.TOKEN_KEY, token);
    }
}
