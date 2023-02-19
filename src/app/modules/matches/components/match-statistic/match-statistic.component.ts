import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { GameRound } from 'src/app/modules/l4d2-play-stats/game-round';
import { PlayerName } from 'src/app/modules/l4d2-play-stats/player-name';
import { Scoring } from 'src/app/modules/l4d2-play-stats/scoring';
import { Half } from 'src/app/modules/l4d2-play-stats/statistics';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { StatisticsResult } from 'src/app/modules/statistics/results/statistics.result';
import { StatisticsService } from 'src/app/modules/statistics/services/statistics.service';
import { MatchResult } from '../../results/match.result';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-match-statistic',
  templateUrl: './match-statistic.component.html',
  styleUrls: ['./match-statistic.component.scss']
})
export class MatchStatisticComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public start?: string | null;
  public end?: string | null;
  public match?: MatchResult;
  public statisticId?: string | null;
  public statistic?: StatisticsResult;

  public gameRound?: GameRound | null;
  public halves?: Half[];
  public scoring?: Scoring | null;
  public playerNames?: PlayerName[];
  public teamA?: PlayerName[];
  public teamB?: PlayerName[];

  public playersTableModel?: TableModel;

  @ViewChild('playerNameTemplate') public playerNameTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private matchesService: MatchesService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.start = this.route.snapshot.paramMap.get('start');
    this.end = this.route.snapshot.paramMap.get('end');
    this.statisticId = this.route.snapshot.paramMap.get('statisticId');

    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.matchesService.between(this.serverId!, this.start!, this.end!).subscribe(matches => this.match = matches[0]);
    this.statisticsService.find(this.serverId!, this.statisticId!).subscribe(statistic => {
      this.statistic = statistic;
      this.gameRound = statistic.statistic?.gameRound;
      this.halves = statistic.statistic?.halves;
      this.scoring = statistic.statistic?.scoring;
      this.playerNames = statistic.statistic?.playerNames;
      this.teamA = statistic.statistic?.teamA;
      this.teamB = statistic.statistic?.teamB;

      this.playersTableModel = this.buildTableModel(statistic.statistic?.playerNames!);
    });
  }

  buildTableModel(playerNames: PlayerName[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "#" }),
      new TableHeaderItem({ data: "Steam ID" }),
      new TableHeaderItem({ data: "Community ID" }),
      new TableHeaderItem({ data: "Nome" })
    ];

    for (const playerName of playerNames) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: playerName.index }),
        new TableItem({ data: playerName.steamId }),
        new TableItem({ data: playerName.communityId }),
        new TableItem({ data: playerName, title: playerName.name, template: this.playerNameTemplate }),
      ));
    }

    return tableModel;
  }
}
