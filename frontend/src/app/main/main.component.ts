import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatypeDialogComponent } from '../datatype-dialog/datatype-dialog.component';
import { MatTable } from '@angular/material/table';
import { Options } from '../datatypes/api';

export interface TableData {
  name: string;
  dataType: string;
  options: Options;
}

const TABLE_DATA: TableData[] = [];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dataType', 'options', 'close'];
  dataSource = [...TABLE_DATA];

  @ViewChild(MatTable) table: MatTable<TableData>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DatatypeDialogComponent, {
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterClosed;
  }

  addData() {
    const newRow: TableData = {
      name: '',
      dataType: '',
      options: {
        min: undefined,
        max: undefined,
        min_date: undefined,
        max_date: undefined,
        value: [],
        country_code: '',
        is_random: undefined,
        size: undefined,
      },
    };
    this.dataSource = [...this.dataSource, newRow];
    console.log(this.dataSource);
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
    console.log(this.dataSource);
  }
}
