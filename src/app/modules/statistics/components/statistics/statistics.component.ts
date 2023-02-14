import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchResult } from 'src/app/modules/matches/results/match.result';
import { MatchesService } from 'src/app/modules/matches/services/matches.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public matches?: MatchResult[];

  constructor(private activatedRoute: ActivatedRoute,
    private matchesService: MatchesService) {
  }

  ngOnInit(): void {
    const server = this.activatedRoute.snapshot.paramMap.get('server')!;
    this.matchesService.get(server).subscribe(matches => this.matches = matches);
  }

}
