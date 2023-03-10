import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../match';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  constructor(protected http: HttpClient) {
  }

  get(server: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.apiUrl}/api/matches/${server}`);
  }

  between(server: string, start: string, end: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.apiUrl}/api/matches/${server}/between/${start}/and/${end}`);
  }
}
