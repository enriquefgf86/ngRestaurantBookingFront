import { HttpClient } from '@angular/common/http';
import {
  paymentIntent,
  paymentIntentConfirmed,
} from './../models/payment.model';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
const API = 'http://localhost:8080/restaurant-booking/version1/';
@Injectable({
  providedIn: 'root',
})
export class PaymentServiceService {
  private payment: PaymentModel;
  constructor(private http: HttpClient) {}
  getPayment() {
    return this.payment;
  }
  setPaymment(payment: PaymentModel) {
    this.payment = payment;
  }

  bookAndPayDone(payment: paymentIntent) {
    return this.http.post(API + 'payment', payment);
  }

  cancelBookingDone(payment: String) {
    return this.http.post(API + 'payment/cancel/' + payment, {});
  }

  confirmBookingDone(payment: paymentIntentConfirmed) {
    return this.http.post(API + 'payment/confirm/', payment);
  }
}
