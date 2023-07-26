import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatypeDialogComponent } from '../datatype-dialog/datatype-dialog.component';
import { MatTable } from '@angular/material/table';
import { Options } from '../datatypes/api';
import { OptionDialogComponent } from '../option-dialog/option-dialog.component';

export interface TableData {
  name: string;
  dataType: string;
  datatype_json: string;
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

    dialogRef.afterClosed().subscribe((val) => {
      element.dataType = val.title;
      element.datatype_json = val.datatype_json;
    });
    console.log(this.dataSource);
  }

  openOptionsDialog(element: any) {
    const dialogRef = this.dialog.open(OptionDialogComponent, {
      panelClass: 'my-custom-dialog',
      data: {
        datatype: element.datatype_json,
      },
    });

    dialogRef.afterClosed().subscribe(
      (val) => {
        element.options = val;
        console.log(val);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.table.renderRows();
      }
    );
  }

  optionsDisabled(element: any): boolean {
    const enabledList = [
      'custom_field',
      'naming_series',
      'phone_number',
      'number',
      'date_time',
    ];
    return !enabledList.some((val) => val === element.datatype_json);
  }

  addData() {
    const newRow: TableData = {
      name: '',
      dataType: '',
      datatype_json: '',
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
