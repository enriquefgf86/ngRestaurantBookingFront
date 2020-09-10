import { NgModule } from '@angular/core';
//modulo de routerizacion
import { Routes, RouterModule } from '@angular/router';

//Componentes enrutados
import { ExploreComponent } from './components/explore/explore.component';
import { BookingComponent } from './components/booking/booking.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', component: ExploreComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'cancel_booking', component: CancelBookingComponent },
  {path:'payment',component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
