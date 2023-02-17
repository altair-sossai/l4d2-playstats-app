import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
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
  public matchesTableModel?: TableModel;

  @ViewChild('matchDateTemplate') public matchDateTemplate?: TemplateRef<any>;
  @ViewChild('teamTemplate') public teamTemplate?: TemplateRef<any>;
  @ViewChild('scoreTemplate') public scoreTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate') public actionsTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
    this.matchesService.get(this.server!).subscribe(matches => {
      this.matches = matches;
      this.matchesTableModel = this.buildTableModel(matches);
    });
  }

  buildTableModel(matches: MatchResult[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Data" }),
      new TableHeaderItem({ data: "Campanha" }),
      new TableHeaderItem({ data: "Time A" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Time B" }),
      new TableHeaderItem({ data: "Ações" }),
    ];

    for (const match of matches) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: match.matchDate, template: this.matchDateTemplate }),
        new TableItem({ data: match.campaign }),
        new TableItem({ data: match.teams[0]?.players, template: this.teamTemplate }),
        new TableItem({ data: match.teams, template: this.scoreTemplate }),
        new TableItem({ data: match.teams[1]?.players, template: this.teamTemplate }),
        new TableItem({ data: match, template: this.actionsTemplate }),
      ));
    }

    return tableModel;
  }

}
