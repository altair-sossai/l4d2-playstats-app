import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatchResult } from '../results/match.result';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  constructor(protected http: HttpClient) {
  }

  get(server: string): Observable<MatchResult[]> {
    return this.http.get<MatchResult[]>(`${environment.apiUrl}/api/matches/${server}`);
  }
}
