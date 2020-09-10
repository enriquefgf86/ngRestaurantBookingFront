import { Injectable } from '@angular/core';
import { restaurantsReduced } from '../models/restaurantsReduced.model';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createBooking } from '../models/createBooking.model';

const API =
  'http://ngbookingrestaurantaplication1-env.eba-t8mabmiw.us-west-2.elasticbeanstalk.com/restaurant-booking/version1/';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  restaurant: restaurantsReduced;

  constructor(private http: HttpClient) {}

  getAllRestaurants() {
    return this.http.get(API + 'restaurant/all');
  }
  getAllbookings() {
    return this.http.get(API + 'bookings/allBookings');
  }

  getOneRestaurant(id: string) {
    // console.log(id);

    return this.http.get(API + 'restaurant/' + id);
  }
  createRestaurantBooking(booking) {
    return this.http.post(API + 'booking/create', booking);
  }

  cancelBooking(cancelBooking: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(
      API + '/restaurant/delete' + '?bookingLocation=' + cancelBooking,
      options
    );
  }

  // getAllRestaurantsMock() {
  //   const restaurants: restaurantsReduced[] = [];

  //   let restaurant = new restaurantsReduced();
  //   restaurant.id = 1;
  //   restaurant.adress = 'jala julu';
  //   restaurant.imgURL = 'https://i.redd.it/zjtxk45809421.png';
  //   restaurant.name = 'Ahhh';

  //   //Otra forma de mostrar un objeto
  //   let restaurant2: restaurantsReduced;
  //   restaurant2 = {
  //     id: 2,
  //     adress: 'putre',
  //     imgURL: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //     name: 'Tomatico',
  //   };
  //   restaurants.push(restaurant, restaurant2);
  //   return of(restaurants);
  // }
}
