import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { cancelBooking } from 'src/app/models/cancelBooking.model';
import { DelComponent } from 'src/app/dialogs/deletedBook/del/del.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.scss'],
})
export class CancelBookingComponent implements OnInit {
  codeBooking: string;

  constructor(
    private cancelBook: AppServiceService,
    public cancelBookDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openCancelBookDialog(code: string): void {
    const dialogRef = this.cancelBookDialog.open(DelComponent, {
      width: '300px',
      data: { code: code },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async cancelBooking() {
    await this.cancelBook
      .cancelBooking(this.codeBooking)
      .subscribe(async (cancelData: any) => {
        console.log(cancelData);
        const code =
          (await 'Success on Cancel Booking With Code ') + this.codeBooking;
        console.log(code);
        await this.openCancelBookDialog(code);
        await this.router.navigate(['/']);
      });
    console.log(
      this.codeBooking,
      'Success on Cancel Booking With Code ' + this.codeBooking
    );
  }
}
