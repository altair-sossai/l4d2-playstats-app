import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticsResult } from '../../results/statistics.result';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

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
