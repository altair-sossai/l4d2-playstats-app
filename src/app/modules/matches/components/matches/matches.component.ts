import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchResult } from '../../results/match.result';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public server?: string | null;
  public matches?: MatchResult[];

  constructor(private route: ActivatedRoute,
    private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
    this.matchesService.get(this.server!).subscribe(matches => this.matches = matches);
  }

}
