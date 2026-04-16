import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

type AppComponent = {
  id: number,
  name: string,
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  components = []

  httpClient = inject(HttpClient)

  ngOnInit() {

    console.log('debut');

    this.httpClient.get<string>('http://localhost:8080/component/list')
      .subscribe((listComponents) => {

        this.components = listComponents;

      })

    console.log("fin");
  }


}
