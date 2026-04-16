import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

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

    this.httpClient.get('http://localhost:8080/component/list')
      .subscribe((res) => {

        console.log(res);

      })

    console.log("fin");
  }


}
