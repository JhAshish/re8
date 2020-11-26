import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header : {
      title: 'RE8',
      strapline: ''
    },
    content: 'RE8 is an app to rate restaurants near you and get the information regarding them and what others think about them!'
  };
}
