import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-locked-screen',
  templateUrl: './locked-screen.component.html',
  styleUrls: ['./locked-screen.component.scss']
})
export class LockedScreenComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authService.authenticated();
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (!token)
        return;

      this.authService.setToken(token);
      this.virtualMachine();
    });
  }

  autenticar(): void {
    var token = window.prompt("Informe o token de autenticação");
    if (!token)
      return;

    this.authService.setToken(token);
    this.virtualMachine();
  }

  virtualMachine(): void {
    this.router.navigate(['/virtual-machine']);
  }
}
