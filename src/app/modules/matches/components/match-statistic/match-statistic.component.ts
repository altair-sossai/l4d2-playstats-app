import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.statisticsService.find(this.serverId!, this.statisticId!).subscribe(statistic => this.statistic = statistic);
  }
}
