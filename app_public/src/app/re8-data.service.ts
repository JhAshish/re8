import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Restaurant } from './home-list/home-list.component'

@Injectable({
  providedIn: 'root'
})
export class Re8DataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';
  public getRestaurants(lat: number, lng: number): Promise<Restaurant[]> {
    const maxDistance: number = 20;
    const url: string = `${this.apiBaseUrl}/restaurants?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Restaurant[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
