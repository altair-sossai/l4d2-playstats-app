import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/users/services/user.service';
import { User } from 'src/app/modules/auth/users/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  version = environment.version;
  me?: User;

  constructor(private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.me().subscribe(me => this.me = me);
  }

  auth(): void {
    this.router.navigate(['/auth']);
  }
}
