import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.scss',
})
export class DetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  component = signal<Composant | null>(null);

  ngOnInit() {
    this.route.params.subscribe((parametre) => {
      const id = +parametre['id'];

      if (Number.isNaN(id)) {
        alert('ID non valide'); // peut etre remplacer par un message, ou une redirection vers une page 404
      } else {
        this.httpClient
          .get<Composant>('http://localhost:8080/component/' + id)
          .subscribe((component) => this.component.set(component));
      }
    });
  }
}
