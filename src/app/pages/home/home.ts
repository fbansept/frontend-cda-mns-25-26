import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  components = signal<Composant[]>([]);

  httpClient = inject(HttpClient);
  authService = inject(AuthService);

  ngOnInit() {
    console.log('debut');

    this.httpClient
      .get<Composant[]>('http://localhost:8080/component/list')
      .subscribe((listComponents) => {
        this.components.set(listComponents);
      });

    console.log('fin');
  }
}
