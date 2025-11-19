import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MesLivres';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null ||
      this.authService.isTokenExpired())
      this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
  }
}
