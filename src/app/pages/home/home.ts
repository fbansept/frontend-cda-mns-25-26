import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  components = signal<Composant[]>([]);

  httpClient = inject(HttpClient);

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
