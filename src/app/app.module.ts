import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  RouterModule,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';
import { HeaderComponent } from './components/header/header.component';
import { AppServiceService } from './services/app-service.service';
import { InfoComponent } from './dialogs/info/info.component';
import { DelComponent } from './dialogs/deletedBook/del/del.component';
import { PaymentComponent } from './components/payment/payment.component';
import { StripeGenerateTokenComponent } from './components/stripe-generate-token/stripe-generate-token.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    ExploreComponent,
    CancelBookingComponent,
    HeaderComponent,
    InfoComponent,
    DelComponent,
    PaymentComponent,
    StripeGenerateTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    NgxStripeModule.forRoot(
      'pk_test_51HKKJsFEOxZLmvASfbB8PUqkGXcnBMLKPkL6pPGNMrSXDJWCyiIUnphVg6raljAgkddDrfY4oa0zQCFtswgGlaZd00kX8RJwqH'
    ),
  ],
  providers: [AppServiceService, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
