import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: 'RE8',
      strapline: 'Places to eat !'
    },
    sidebar: 'Looking for good places to eat check them out here !'
  };

}
