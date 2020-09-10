import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogCancelInterface } from 'src/app/models/dialogCancelInterface.model';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.scss'],
})
export class DelComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogCancelInterface
  ) {}

  ngOnInit(): void {}

  closeCancel(): void {
    this.dialogRef.close();
  }
}
