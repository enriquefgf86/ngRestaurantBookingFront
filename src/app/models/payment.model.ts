import { createBooking } from './createBooking.model';

export class PaymentModel extends createBooking {
  location: string;
}

export interface paymentIntent {
  //Se inicializa la interfaz que emula precio y descripcion segun
  //el endpoint de swagger
  description: string;
  price: number;
}

export interface paymentIntentConfirmed {
  //Se inicializa la interfaz que emula la confirmacion del pago confirmado
  //el endpoint de swagger
  emailReceiver: String;
  location: String;
  nameReceiver: String;
  paymentId: String;
}
