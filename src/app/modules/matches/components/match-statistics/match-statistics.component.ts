import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { StatisticsResult } from 'src/app/modules/statistics/results/statistics.result';
import { StatisticsService } from 'src/app/modules/statistics/services/statistics.service';
import { Match } from '../../match';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-match-statistics',
  templateUrl: './match-statistics.component.html',
  styleUrls: ['./match-statistics.component.scss']
})
export class MatchStatisticsComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public start?: string | null;
  public end?: string | null;
  public match?: Match;
  public statistics?: StatisticsResult[];
  public statisticsTableModel?: TableModel;

  @ViewChild('dateTimeTemplate') public dateTimeTemplate?: TemplateRef<any>;
  @ViewChild('scoreTemplate') public scoreTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate') public actionsTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private matchesService: MatchesService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.start = this.route.snapshot.paramMap.get('start');
    this.end = this.route.snapshot.paramMap.get('end');

    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.matchesService.between(this.serverId!, this.start!, this.end!).subscribe(matches => this.match = matches[0]);
    this.statisticsService.between(this.serverId!, this.start!, this.end!).subscribe(statistics => {
      this.statistics = statistics;
      this.statisticsTableModel = this.buildTableModel(statistics);
    });
  }

  buildTableModel(statistics: StatisticsResult[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "#" }),
      new TableHeaderItem({ data: "Início" }),
      new TableHeaderItem({ data: "Fim" }),
      new TableHeaderItem({ data: "Duração" }),
      new TableHeaderItem({ data: "Configuração" }),
      new TableHeaderItem({ data: "Mapa" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Ações" })
    ];

    for (let i = 0; i < statistics.length; i++) {
      const result = statistics[i];
      const statistic = result.statistic;
      const gameRound = statistic?.gameRound;
      const scoring = statistic?.scoring;
      const route = {
        serverId: this.serverId,
        start: this.start,
        end: this.end,
        statisticId: result.statisticId
      }

      tableModel.addRow(new TableRow(
        new TableItem({ data: i + 1 }),
        new TableItem({ data: result.statistic?.mapStart, template: this.dateTimeTemplate, title: '' }),
        new TableItem({ data: result.statistic?.mapEnd, template: this.dateTimeTemplate, title: '' }),
        new TableItem({ data: result.statistic?.mapElapsed }),
        new TableItem({ data: gameRound?.configurationName }),
        new TableItem({ data: gameRound?.mapName }),
        new TableItem({ data: scoring, template: this.scoreTemplate, title: '' }),
        new TableItem({ data: route, template: this.actionsTemplate, title: '' }),
      ));
    }

    return tableModel;
  }
}
