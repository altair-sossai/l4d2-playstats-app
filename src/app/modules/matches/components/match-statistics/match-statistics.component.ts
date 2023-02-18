import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { StatisticsResult } from 'src/app/modules/statistics/results/statistics.result';
import { StatisticsService } from 'src/app/modules/statistics/services/statistics.service';
import { MatchResult } from '../../results/match.result';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-match-statistics',
  templateUrl: './match-statistics.component.html',
  styleUrls: ['./match-statistics.component.scss']
})
export class MatchStatisticsComponent implements OnInit {

  public server?: string | null;
  public start?: string | null;
  public end?: string | null;
  public match?: MatchResult;
  public statistics?: StatisticsResult[];
  public statisticsTableModel?: TableModel;

  @ViewChild('dateTimeTemplate') public dateTimeTemplate?: TemplateRef<any>;
  @ViewChild('scoreTemplate') public scoreTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate') public actionsTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private matchesService: MatchesService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
    this.start = this.route.snapshot.paramMap.get('start');
    this.end = this.route.snapshot.paramMap.get('end');

    this.matchesService.between(this.server!, this.start!, this.end!).subscribe(matches => this.match = matches[0]);
    this.statisticsService.between(this.server!, this.start!, this.end!).subscribe(statistics => {
      this.statistics = statistics;
      this.statisticsTableModel = this.buildTableModel(statistics);
    });
  }

  buildTableModel(statistics: StatisticsResult[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Data" }),
      new TableHeaderItem({ data: "Mapa" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Ações" })
    ];

    for (const result of statistics) {
      const statistic = result.statistic;
      const gameRound = statistic?.gameRound;
      const scoring = statistic?.scoring;
      const route = {
        server: this.server,
        start: this.start,
        end: this.end,
        statisticId: result.statisticId
      }

      tableModel.addRow(new TableRow(
        new TableItem({ data: gameRound?.when, template: this.dateTimeTemplate, title: '' }),
        new TableItem({ data: gameRound?.mapName, title: '' }),
        new TableItem({ data: scoring, template: this.scoreTemplate, title: '' }),
        new TableItem({ data: route, template: this.actionsTemplate, title: '' }),
      ));
    }

    return tableModel;
  }
}
