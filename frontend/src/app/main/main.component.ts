import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DatatypeDialogComponent} from '../datatype-dialog/datatype-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DatatypeDialogComponent,{
      panelClass: 'dialogContainer'
    });
  }
}
