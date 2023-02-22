import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { StatisticsSimplifiedResult } from '../../results/statistics-simplified.result';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public statistics?: StatisticsSimplifiedResult[];
  public statisticsTableModel?: TableModel;

  @ViewChild('mapDateTemplate') public mapDateTemplate?: TemplateRef<any>;
  @ViewChild('teamTemplate') public teamTemplate?: TemplateRef<any>;
  @ViewChild('scoreTemplate') public scoreTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate') public actionsTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.statisticsService.get(this.serverId!).subscribe(statistics => {
      this.statistics = statistics;
      this.statisticsTableModel = this.buildTableModel(statistics);
    });
  }

  buildTableModel(statistics: StatisticsSimplifiedResult[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Data", className: 'text-center' }),
      new TableHeaderItem({ data: "Duração" }),
      new TableHeaderItem({ data: "Configuração" }),
      new TableHeaderItem({ data: "Mapa" }),
      new TableHeaderItem({ data: "Equipe A" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Equipe B" }),
      new TableHeaderItem({ data: "Ações" })
    ];

    for (const statistic of statistics) {
      const gameRound = statistic?.gameRound;
      const scoring = statistic?.scoring;
      const route = {
        serverId: this.serverId,
        statisticId: statistic.statisticId
      }

      tableModel.addRow(new TableRow(
        new TableItem({ data: statistic, template: this.mapDateTemplate, title: '' }),
        new TableItem({ data: statistic?.mapElapsed }),
        new TableItem({ data: gameRound?.configurationName }),
        new TableItem({ data: gameRound?.mapName }),
        new TableItem({ data: statistic.teamA, template: this.teamTemplate, title: '' }),
        new TableItem({ data: scoring, template: this.scoreTemplate, title: '' }),
        new TableItem({ data: statistic.teamB, template: this.teamTemplate, title: '' }),
        new TableItem({ data: route, template: this.actionsTemplate, title: '' }),
      ));
    }

    return tableModel;
  }
}
