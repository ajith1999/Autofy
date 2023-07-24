import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataType, datas} from '../datatypes/data';

@Component({
  selector: 'app-datatype-dialog',
  templateUrl: './datatype-dialog.component.html',
  styleUrls: ['./datatype-dialog.component.css']
})
export class DatatypeDialogComponent implements OnInit {

  public dataTypes: DataType[];

  constructor(
    public dialogRef: MatDialogRef<DatatypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
     this.dataTypes = [...datas];
  }

  ngOnInit(): void {

  }

}
