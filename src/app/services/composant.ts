import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationService } from './notification';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ComposantService {
  httpClient = inject(HttpClient);
  notification = inject(NotificationService);

  readonly composantList = signal<Composant[]>([]);

  get(id: number) {
    return this.httpClient.get<Composant>(`${environment.serverUrl}/component/${id}`);
  }

  getAll() {
    return this.httpClient
      .get<Composant[]>(`${environment.serverUrl}/component/list`)
      .pipe(tap((composantList) => this.composantList.set(composantList)));
  }

  create(composant: Composant) {
    return this.httpClient
      .post(`${environment.serverUrl}/component`, composant)
      .pipe(tap((resultat) => this.getAll().subscribe()));
  }

  update(composant: Composant, id: number) {
    return this.httpClient
      .put(`${environment.serverUrl}/component/${id}`, composant)
      .pipe(tap((resultat) => this.getAll().subscribe()));
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${environment.serverUrl}/component/${id}`)
      .pipe(tap((resultat) => this.getAll().subscribe()));
  }
}
