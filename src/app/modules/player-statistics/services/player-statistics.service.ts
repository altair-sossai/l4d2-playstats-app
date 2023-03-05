import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../player';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatisticsService {
  constructor(protected http: HttpClient) {
  }

  get(server: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/api/player-statistics/${server}`);
  }
}
