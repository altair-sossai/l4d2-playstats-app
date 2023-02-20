import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { StatisticsResult } from '../../results/statistics.result';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public statisticId?: string | null;
  public statistic?: StatisticsResult;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.statisticId = this.route.snapshot.paramMap.get('statisticId');

    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.statisticsService.find(this.serverId!, this.statisticId!).subscribe(statistic => this.statistic = statistic);
  }
}
