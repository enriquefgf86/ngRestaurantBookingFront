import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogDataInterface } from 'src/app/models/dialogDataInterface.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoComponent>, @Inject(MAT_DIALOG_DATA) public data: dialogDataInterface
  ) {}

  ngOnInit(): void {}

  onClick(): void {
    this.dialogRef.close();
  }



}
