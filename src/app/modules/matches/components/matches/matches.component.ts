import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { MatchResult } from '../../results/match.result';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public matches?: MatchResult[];
  public matchesTableModel?: TableModel;

  @ViewChild('dateTimeTemplate') public dateTimeTemplate?: TemplateRef<any>;
  @ViewChild('teamTemplate') public teamTemplate?: TemplateRef<any>;
  @ViewChild('scoreTemplate') public scoreTemplate?: TemplateRef<any>;
  @ViewChild('actionsTemplate') public actionsTemplate?: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.serverId = this.route.snapshot.paramMap.get('server');
    this.serverService.find(this.serverId!).subscribe(server => this.server = server);
    this.matchesService.get(this.serverId!).subscribe(matches => {
      this.matches = matches;
      this.matchesTableModel = this.buildTableModel(matches);
    });
  }

  buildTableModel(matches: MatchResult[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Data" }),
      new TableHeaderItem({ data: "Campanha" }),
      new TableHeaderItem({ data: "Equipe A" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Equipe B" }),
      new TableHeaderItem({ data: "Ações" }),
    ];

    for (const match of matches) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: match.matchStart, template: this.dateTimeTemplate, title: '' }),
        new TableItem({ data: match.campaign, title: '' }),
        new TableItem({ data: match.teams[0]?.players, template: this.teamTemplate, title: '' }),
        new TableItem({ data: match.teams, template: this.scoreTemplate, title: '' }),
        new TableItem({ data: match.teams[1]?.players, template: this.teamTemplate, title: '' }),
        new TableItem({ data: match, template: this.actionsTemplate, title: '' }),
      ));
    }

    return tableModel;
  }

}
