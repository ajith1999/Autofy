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

  ngOnInit(): void {
    this.addData();
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(DatatypeDialogComponent, {
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe((val) => (element.dataType = val));
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
        html_value: undefined,
      },
    };
    this.dataSource = [...this.dataSource, newRow];
    console.log(this.dataSource);
  }

  removeData(element: any) {
    const removeIndex = this.dataSource.findIndex(
      (row) => row.name == element.name
    );
    this.dataSource.splice(removeIndex, 1);
    this.table.renderRows();
    console.log(this.dataSource);
  }
}
