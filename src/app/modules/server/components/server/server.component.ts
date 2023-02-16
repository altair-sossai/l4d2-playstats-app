import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  public server?: string | null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.server = this.route.snapshot.paramMap.get('server');
  }
}
