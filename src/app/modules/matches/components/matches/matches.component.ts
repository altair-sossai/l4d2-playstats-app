import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableItem, TableModel, TableRow } from 'carbon-components-angular';
import { ServerResult } from 'src/app/modules/server/results/server.result';
import { ServerService } from 'src/app/modules/server/services/server.service';
import { Match } from '../../match';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public serverId?: string | null;
  public server?: ServerResult;
  public matches?: Match[];
  public matchesTableModel?: TableModel;

  @ViewChild('matchDateTemplate') public matchDateTemplate?: TemplateRef<any>;
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

  buildTableModel(matches: Match[]): TableModel {
    const tableModel = new TableModel();

    tableModel.header = [
      new TableHeaderItem({ data: "Data", className: 'text-center' }),
      new TableHeaderItem({ data: "Duração", className: 'text-center' }),
      new TableHeaderItem({ data: "Campanha" }),
      new TableHeaderItem({ data: "Mapas", className: 'text-center' }),
      new TableHeaderItem({ data: "Equipe A" }),
      new TableHeaderItem({ data: "Placar" }),
      new TableHeaderItem({ data: "Equipe B" }),
      new TableHeaderItem({ data: "Ações" }),
    ];

    for (const match of matches) {
      tableModel.addRow(new TableRow(
        new TableItem({ data: match, template: this.matchDateTemplate, title: '' }),
        new TableItem({ data: match.matchElapsed }),
        new TableItem({ data: match.campaign }),
        new TableItem({ data: match.statistics.length }),
        new TableItem({ data: match.teams[0]?.players, template: this.teamTemplate, title: '' }),
        new TableItem({ data: match.teams, template: this.scoreTemplate, title: '' }),
        new TableItem({ data: match.teams[1]?.players, template: this.teamTemplate, title: '' }),
        new TableItem({ data: match, template: this.actionsTemplate, title: '' }),
      ));
    }

    return tableModel;
  }

}
