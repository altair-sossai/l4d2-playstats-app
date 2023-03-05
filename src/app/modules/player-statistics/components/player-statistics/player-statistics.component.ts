import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { Player } from '../../player';
import { PlayerStatisticsService } from '../../services/player-statistics.service';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {
  public serverId?: string | null;
  public server?: ServerResult;
  public players?: Player[];
  public playersTableModel?: TableModel;

  @ViewChild('playerNameTemplate') public playerNameTemplate?: TemplateRef<any>;
  @ViewChild('numberTemplate') public numberTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private playerstatisticsService: PlayerStatisticsService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.playerstatisticsService.get(this.serverId!).subscribe(players => {
      this.players = players;
      this.playersTableModel = this.buildTableModel(players);
    });
  }

  buildTableModel(players: Player[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Nome", sortable: false }),
      new TableHeaderItem({ data: "Commons mortos", className: 'text-center' }),
      new TableHeaderItem({ data: "Especiais mortos", className: 'text-center' }),
      new TableHeaderItem({ data: "Dano causado aos infectados", className: 'text-center' }),
      new TableHeaderItem({ data: "Dano causado como infectado", className: 'text-center' }),
    ];

    for (const player of players) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: player, template: this.playerNameTemplate, title: player.name }),
        new TableItem({ data: player.survivorStats.common, template: this.numberTemplate, title: player.survivorStats.common }),
        new TableItem({ data: player.survivorStats.siKilled, template: this.numberTemplate, title: player.survivorStats.siKilled }),
        new TableItem({ data: player.survivorStats.siDamage, template: this.numberTemplate, title: player.survivorStats.siDamage }),
        new TableItem({ data: player.infectedStats.dmgTotal, template: this.numberTemplate, title: player.infectedStats.dmgTotal }),
      ));
    }

    return tableModel;
  }
}
