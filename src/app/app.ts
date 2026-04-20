import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ComposantService } from './services/composant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  composantService = inject(ComposantService)

  ngOnInit() {
    this.composantService
      .getAll()
      .subscribe(composantList => console.log("coucou !!!! "));
  }
  
}
