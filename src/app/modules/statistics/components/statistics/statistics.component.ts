import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticsSimplifiedResult } from '../../results/statistics-simplified.result';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public server?: string | null;
  public statistics?: StatisticsSimplifiedResult[];

  constructor(private route: ActivatedRoute,
    private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');

    this.statisticsService.get(this.server!).subscribe(statistics => this.statistics = statistics);
  }
}
