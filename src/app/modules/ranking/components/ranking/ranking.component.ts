import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { Player } from 'src/app/modules/ranking/player';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { RankingService } from '../../services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  public serverId?: string | null;
  public server?: ServerResult;
  public players?: Player[];
  public playersTableModel?: TableModel;

  @ViewChild('positionTemplate') public positionTemplate?: TemplateRef<any>;
  @ViewChild('playerNameTemplate') public playerNameTemplate?: TemplateRef<any>;
  @ViewChild('numberTemplate') public numberTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private rankingService: RankingService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.rankingService.get(this.serverId!).subscribe(players => {
      this.players = players;
      this.playersTableModel = this.buildTableModel(players);
    });
  }

  buildTableModel(players: Player[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Posição", className: 'text-center' }),
      new TableHeaderItem({ data: "Nome", sortable: false }),
      new TableHeaderItem({ data: "Vitórias", className: 'text-center' }),
      new TableHeaderItem({ data: "MVPs", className: 'text-center' }),
      new TableHeaderItem({ data: "Derrotas", className: 'text-center' })
    ];

    for (const player of players) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: player.position, template: this.positionTemplate, title: player.position }),
        new TableItem({ data: player, template: this.playerNameTemplate, title: player.name }),
        new TableItem({ data: player.wins, template: this.numberTemplate, title: player.wins }),
        new TableItem({ data: player.mvps, template: this.numberTemplate, title: player.mvps }),
        new TableItem({ data: player.loss, template: this.numberTemplate, title: player.loss })
      ));
    }

    return tableModel;
  }
}
