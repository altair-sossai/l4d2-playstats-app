import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticsSimplifiedResult } from '../results/statistics-simplified.result';
import { StatisticsResult } from '../results/statistics.result';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(protected http: HttpClient) {
  }

  get(server: string): Observable<StatisticsSimplifiedResult[]> {
    return this.http.get<StatisticsSimplifiedResult[]>(`${environment.apiUrl}/api/statistics/${server}`);
  }

  find(server: string, statisticId: string): Observable<StatisticsResult> {
    return this.http.get<StatisticsResult>(`${environment.apiUrl}/api/statistics/${server}/${statisticId}`);
  }

  between(server: string, start: string, end: string): Observable<StatisticsResult[]> {
    return this.http.get<StatisticsResult[]>(`${environment.apiUrl}/api/statistics/${server}/between/${start}/and/${end}`);
  }
}
