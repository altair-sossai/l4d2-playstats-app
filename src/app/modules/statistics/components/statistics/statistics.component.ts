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

  public statistics?: StatisticsSimplifiedResult[];

  constructor(private activatedRoute: ActivatedRoute,
    private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    const server = this.activatedRoute.snapshot.paramMap.get('server')!;
    this.statisticsService.get(server).subscribe(statistics => this.statistics = statistics);
  }

}
