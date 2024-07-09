import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, map, pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authSvc.isLoggedIn();
  }

  logout(): void {
    this.authSvc.logout().subscribe({
      next: () => {
        console.log('Logout completato');
      },
      error: error => {
        console.error('Errore durante il logout:', error);
      }
    });
  }

  myFunction(): void {
    const x: HTMLElement | null = document.getElementById("navDemo");
    if (x) {
      if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }
  }
}
