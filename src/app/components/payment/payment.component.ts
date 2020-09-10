import { PaymentServiceService } from './../../services/payment-service.service';
import {
  paymentIntent,
  PaymentModel,
  paymentIntentConfirmed,
} from './../../models/payment.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //variables propias de ;la libreria de stripngx
  elementsOptions: StripeElementsOptions = { locale: 'es' };
  stripeTest: FormGroup;

  public bookedWithPayment: PaymentModel;
  public paymentConfirmed: String;

  public successMessage: String = 'Process Done';

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  constructor(
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentServiceService
  ) {}

  ngOnInit() {
    this.bookedWithPayment = this.paymentService.getPayment();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [''],
    });

    this.stripeTest = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  buyAndGenerateCodeofPurchase(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe((result) => {
        if (result.token) {
          const paymentIntentAction: paymentIntent = {
            description:
              this.bookedWithPayment.name +
              '' +
              this.bookedWithPayment.location,
            price: this.bookedWithPayment.price,
          };
          this.executePaymentIntent(paymentIntentAction);
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  executePaymentIntent(payment: paymentIntent) {
    this.paymentService.bookAndPayDone(payment).subscribe((result: any) => {
      this.paymentConfirmed = result.id;
    });
  }

  cancelBooking() {
    this.paymentService
      .cancelBookingDone(this.paymentConfirmed)
      .subscribe((response: any) => {
        this.successMessage = 'Canceled booking.Check your email';
      });
  }

  confirmBooking() {
    const confirmdata: paymentIntentConfirmed = {
      emailReceiver: this.bookedWithPayment.email,
      location: this.bookedWithPayment.location,
      nameReceiver: this.bookedWithPayment.name,
      paymentId: this.paymentConfirmed,
    };

    this.paymentService
      .confirmBookingDone(confirmdata)
      .subscribe((response: any) => {
        this.successMessage = 'Payment Done!!!.A confirmation email was sent to your adress';
      });
  }
}
