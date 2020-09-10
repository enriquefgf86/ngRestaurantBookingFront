import { Component, OnInit } from '@angular/core';
import { restaurantsReduced } from 'src/app/models/restaurantsReduced.model';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  restaurants: restaurantsReduced[];
  // restItem:restaurantsReduced;

  constructor(private service:AppServiceService) {}

  ngOnInit(): void {
    this.service.getAllRestaurants().subscribe((result: any) => {
      // console.log(result);
      this.restaurants = result.data;
      // console.log(this.restaurants);

    });
  }
}
