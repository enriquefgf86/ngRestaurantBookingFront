import { Restaurant } from './../../models/restaurant.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  EmailValidator,
} from '@angular/forms';
import { AppServiceService } from 'src/app/services/app-service.service';
import { createBooking } from 'src/app/models/createBooking.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from 'src/app/dialogs/info/info.component';
import { restaurantsReduced } from 'src/app/models/restaurantsReduced.model';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  restaurantDetails: restaurantsReduced;

  bookingRestaurant: FormGroup;

  bookingSettled = new createBooking();

  dataSelect: any;

  id: string;

  selectedId: any;

  booked: any;

  notBooked: any[] = [];

  restaurantSelectedTurns: any[];

  bookedTurns: any[] = [];

  restaurantSelected: Restaurant;

  private idRestaurant: number;

  constructor(
    private formBuilder: FormBuilder,
    private allRestaurantsData: AppServiceService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.allRestaurantsData.getAllbookings().subscribe(async (result: any) => {
      this.booked = await result; //trayendo los bookings exitentes para todos los restaurantes
      console.log(this.booked);
    });

    (this.id = this.route.snapshot.params['id']), //para marcar el routing en el elemento seleccionado
      this.allRestaurantsData
        .getOneRestaurant(this.id)
        .subscribe(async (selected: any) => {
          //accediendose a la data que se trsaeria desde el servicio una vez
          //pasado el id del restaurante seleccionado

          this.restaurantSelected = await selected.data; //asignadose dicha carga a una variable global
          //(this.restaurantSelected)

          // await console.log(this.restaurantSelected);
          await console.log(this.restaurantSelected.id);
          // console.log(selected);

          this.restaurantSelectedTurns = await selected.data.turns; //asignadose el array de turnos que trae el restaurante
          //seleccionado  a una variable global(this.restaurantSelectedTurns )
          if (this.booked) {
            this.restaurantSelectedTurns.forEach(async (turn) => {
              //accediendose al array de turnos asigando a la variable
              this.booked.data.forEach(async (booking) => {
                //accediendose a todos los booking ya hechos
                console.log(booking, '    booking en general');
                console.log(booking.bookingTurn, '   turno del booking ');
                console.log(turn, '    objeto-turno restaurante seleccionado');
                console.log(turn.name, '    turno en el loop del restaurante');

                if (selected.data.id == booking.restaurantId) {
                  if (turn.name != booking.bookingTurn) {
                    console.log(turn.name + '!=' + booking.bookingTurn);
                    // console.log(selected.data.id + '==' + booking.restaurantId);
                    console.log(
                      this.restaurantSelected.id + '==' + booking.restaurantId
                    );

                    let id = await turn.id;
                    let name = await turn.name;
                    let object = await new Object();
                    object = await { id, name };

                    await this.bookedTurns.push(object);

                    await console.log(object);
                    await console.log(this.bookedTurns);

                    var array = await this.bookedTurns.map((i) =>
                      JSON.stringify(i)
                    );
                    var res = await array.filter((elem, index) => {
                      if (array.indexOf(elem) === array.lastIndexOf(elem)) {
                        return elem;
                      }
                    });
                    var finalResult = await res.map((i) => JSON.parse(i));
                    console.log(finalResult, res);
                    this.notBooked = finalResult;

                    this.restaurantSelected.turns = await [];
                    this.restaurantSelected.turns = this.notBooked;
                    await console.log(this.notBooked);
                    await console.log(this.restaurantSelected.turns);
                    // this.bookedTurns =await [];
                  } else
                    return console.log(turn.name + '==' + booking.bookingTurn);
                } else turn.name;
              });
            });
          }
        });

    let data = this.allRestaurantsData;
    data.getAllRestaurants().subscribe((items: any) => {
      return (this.dataSelect = items), console.log(this.dataSelect);
    });

    // }
  }
  initForm() {
    this.bookingRestaurant = this.formBuilder.group({
      date: [new Date(), Validators.required],
      timeBooking: ['', Validators.required],
      customers: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  openDialog(title: string, info: string): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '400px',
      data: { title: title, info: info },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  setBooking() {
    if (
      this.restaurantSelected.price == null ||
      this.restaurantSelected.price == undefined
    ) {
      this.bookingSettled.price = 900;
    } else {
      this.bookingSettled.price = this.restaurantSelected.price;
    }

    this.bookingSettled.name = this.bookingRestaurant.get('name').value;
    this.bookingSettled.email = this.bookingRestaurant.get('email').value;
    this.bookingSettled.restaurantId = this.restaurantSelected.id;
    this.bookingSettled.turnId = this.bookingRestaurant.get(
      'timeBooking'
    ).value;
    this.bookingSettled.person = this.bookingRestaurant.get('customers').value;
    this.bookingSettled.date = this.bookingRestaurant
      .get('date')
      .value.toISOString();
    console.log(this.bookingSettled);
  }

  async bookRest() {
    if (this.restaurantSelected) {
      await this.setBooking();

      await this.allRestaurantsData
        .createRestaurantBooking(this.bookingSettled)
        .subscribe((dataBooking: any) => {
          console.log(dataBooking.data);
          const title = 'Booking Code : ' + dataBooking.data;
          const info =
            'You  might need the code to access the restaurant.Plase keep it on safe place ';
          this.openDialog(title, info);
          console.log(this.bookingSettled, 'booked!!');
        });
    }
    await this.bookingRestaurant.reset();
    await this.router.navigate(['/']);
  }
  async bookAndPay() {
    if (this.restaurantSelected) {
      await this.setBooking();

      await this.allRestaurantsData
        .createRestaurantBooking(this.bookingSettled)
        .subscribe(async (dataBooking: any) => {
          this.paymentService.setPaymment({
            ...this.bookingSettled,
            location: dataBooking.data,
          });
          await this.router.navigate(['/payment']);
          await this.bookingRestaurant.reset();
        });
    }
  }
}
