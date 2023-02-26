import { Component, Input } from '@angular/core';
import { TagType } from 'carbon-components-angular';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() teamA?: number;
  @Input() teamB?: number;

  public get typeTeamA(): TagType {
    return this.type(this.teamA, this.teamB);
  }

  public get typeTeamB(): TagType {
    return this.type(this.teamB, this.teamA);
  }

  public get diff(): number {
    const teamA = this.teamA ?? 0;
    const teamB = this.teamB ?? 0;

    return Math.abs(teamA - teamB);
  }

  private type(a?: number, b?: number): TagType {
    a = a ?? 0;
    b = b ?? 0;

    return a > b ? 'green' : 'cool-gray';
  }
}
