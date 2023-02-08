import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    me(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/me`);
    }

    get(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    find(userId: string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/users/${userId}`);
    }
}
