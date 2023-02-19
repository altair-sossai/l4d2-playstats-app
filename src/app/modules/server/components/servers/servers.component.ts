import { Component, OnInit } from '@angular/core';
import { ServerResult } from '../../results/server.result';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  public servers?: ServerResult[];

  constructor(private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.serverService.get().subscribe(servers => this.servers = servers);
  }
}
