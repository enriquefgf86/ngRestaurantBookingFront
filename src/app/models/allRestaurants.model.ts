import { restaurantsReduced } from './restaurantsReduced.model';

export interface allRestaurants extends restaurantsReduced {

  description: string;
  turns: any[];
}
