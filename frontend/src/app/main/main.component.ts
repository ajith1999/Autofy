import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DatatypeDialogComponent} from '../datatype-dialog/datatype-dialog.component';
import {MatTable} from '@angular/material/table';

export interface TableData {
  name: string;
  dataType: string;
  options: {};
}

const ELEMENT_DATA: TableData[] = [
  {name: 'Name' , dataType: 'Name', options:{}},
  {name: 'Phone-Number' , dataType: 'PhoneNumber', options:{}},
  {name: 'Email' , dataType: 'Email', options:{}},
  {name: 'Name' , dataType: 'Name', options:{}},
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dataType', 'options'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<TableData>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DatatypeDialogComponent, {
      panelClass: 'dialogContainer'
    });
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}

