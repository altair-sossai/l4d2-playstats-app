import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private matchesService: MatchesService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
    this.start = this.route.snapshot.paramMap.get('start');
    this.end = this.route.snapshot.paramMap.get('end');

    this.matchesService.between(this.server!, this.start!, this.end!).subscribe(matches => this.match = matches[0]);
    this.statisticsService.between(this.server!, this.start!, this.end!).subscribe(statistics => this.statistics = statistics);
  }

}
