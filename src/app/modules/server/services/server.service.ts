import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerResult } from '../results/server.result';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(protected http: HttpClient) {
  }

  get(): Observable<ServerResult[]> {
    return this.http.get<ServerResult[]>(`${environment.apiUrl}/api/servers`);
  }

  find(serverId: string): Observable<ServerResult> {
    return this.http.get<ServerResult>(`${environment.apiUrl}/api/servers/${serverId}`);
  }
}
