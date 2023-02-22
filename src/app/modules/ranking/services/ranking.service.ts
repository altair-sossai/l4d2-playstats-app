import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../../players/player';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  constructor(protected http: HttpClient) {
  }

  get(server: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/api/ranking/${server}`);
  }
}
