import { Component, OnInit } from '@angular/core';
import { Re8DataService } from '../re8-data.service';
import { GeolocationService } from '../geolocation.service';

export class Restaurant {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(private re8DataService: Re8DataService,
    private geolocationService: GeolocationService
  ) { }
  restaurants: Restaurant[] = [];
  public message: string;

  private getRestaurants(position: any): void {
    this.message = 'Searching for nearby places!'; 
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude; 
    this.re8DataService
      .getRestaurants(lat, lng)
        .then(foundRestaurants => {
          this.message = foundRestaurants.length > 0 ? '' : 'No restaurants found!';
          this.restaurants = foundRestaurants;
        });
  }

  private showError(error: any) {
    this.message = error.message;
  }

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser!';
  }

  private getPosition(): void {
    this.message = 'Getting your location...';
    this.geolocationService.getPosition(
      this.getRestaurants.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  ngOnInit(): void {
    this.getPosition();
  }

}
