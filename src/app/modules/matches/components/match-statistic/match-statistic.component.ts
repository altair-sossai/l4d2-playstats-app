import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticsResult } from 'src/app/modules/statistics/results/statistics.result';
import { StatisticsService } from 'src/app/modules/statistics/services/statistics.service';

@Component({
  selector: 'app-match-statistic',
  templateUrl: './match-statistic.component.html',
  styleUrls: ['./match-statistic.component.scss']
})
export class MatchStatisticComponent implements OnInit {

  public server?: string | null;
  public statisticId?: string | null;
  public statistic?: StatisticsResult;

  constructor(private route: ActivatedRoute,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
    this.statisticId = this.route.snapshot.paramMap.get('statisticId');

    this.statisticsService.find(this.server!, this.statisticId!).subscribe(statistic => this.statistic = statistic);
  }
}
