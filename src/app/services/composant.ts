import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationService } from './notification';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComposantService {
  httpClient = inject(HttpClient);
  notification = inject(NotificationService);

  readonly composantList = signal<Composant[]>([]);

  get(id: number) {
    return this.httpClient.get<Composant>('http://localhost:8080/component/' + id);
  }

  getAll() {
    return this.httpClient
      .get<Composant[]>('http://localhost:8080/component/list')
      .pipe(tap((composantList) => this.composantList.set(composantList)));
  }

  create(composant: Composant) {
    return this.httpClient
      .post('http://localhost:8080/component', composant)
      .pipe(tap((resultat) => this.getAll().subscribe()));
  }

  update(composant: Composant, id: number) {
    return this.httpClient
      .put('http://localhost:8080/component/' + id, composant)
      .pipe(tap((resultat) => this.getAll().subscribe()));
  }
}
