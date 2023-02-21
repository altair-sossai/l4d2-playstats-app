import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { GameRound } from 'src/app/modules/l4d2-play-stats/game-round';
import { PlayerName } from 'src/app/modules/l4d2-play-stats/player-name';
import { Scoring } from 'src/app/modules/l4d2-play-stats/scoring';
import { Half, Statistics } from 'src/app/modules/l4d2-play-stats/statistics';
import { StatisticsResult } from '../../results/statistics.result';

@Component({
  selector: 'app-statistic-detail',
  templateUrl: './statistic-detail.component.html',
  styleUrls: ['./statistic-detail.component.scss']
})
export class StatisticDetailComponent implements OnInit, AfterViewInit {
  @Input() statistic!: StatisticsResult;

  public stats?: Statistics | null;
  public gameRound?: GameRound | null;
  public halves?: Half[];
  public scoring?: Scoring | null;
  public playerNames?: PlayerName[];
  public teamA?: PlayerName[];
  public teamB?: PlayerName[];

  public playersTableModel?: TableModel;

  @ViewChild('playerNameTemplate') public playerNameTemplate?: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.stats = this.statistic.statistic;
    this.gameRound = this.statistic.statistic?.gameRound;
    this.halves = this.statistic.statistic?.halves;
    this.scoring = this.statistic.statistic?.scoring;
    this.playerNames = this.statistic.statistic?.playerNames;
    this.teamA = this.statistic.statistic?.teamA;
    this.teamB = this.statistic.statistic?.teamB;
  }

  ngAfterViewInit(): void {
    this.playersTableModel = this.buildTableModel(this.statistic.statistic?.playerNames!);
    this.cdr.detectChanges();
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
        new TableItem({ data: playerName, title: playerName.name, template: this.playerNameTemplate })
      ));
    }

    return tableModel;
  }

  percent(dividend: number, divisor: number): number {
    return !divisor ? 0 : dividend / divisor;
  }
}
