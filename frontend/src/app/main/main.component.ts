import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatypeDialogComponent } from '../datatype-dialog/datatype-dialog.component';
import { MatTable } from '@angular/material/table';
import { ApiData, Options, TableData } from '../datatypes/api';
import { OptionDialogComponent } from '../option-dialog/option-dialog.component';
import { DataService } from '../service/data.service';

const TABLE_DATA: TableData[] = [];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dataType', 'options', 'close'];
  dataSource = [...TABLE_DATA];
  rows: number | undefined;
  jsonBody: ApiData | undefined;
  tableName: string | undefined;

  @ViewChild(MatTable) table: MatTable<TableData>;

  constructor(public dialog: MatDialog, public dataService: DataService) {}

  ngOnInit(): void {
    this.addData();
    //this.setJsonToEmptyOrNull(this.jsonBody);
    console.log(this.jsonBody);
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

  previewData() {
    this.settingUpJsonBody(10);
    this.dataService
      .getData(this.jsonBody)
      .subscribe((val) => console.log(val));
  }

  settingUpJsonBody(rowCount: number) {
    this.jsonBody = {
      table_name: 'MOCK_DATA',
      num_rows: rowCount,
      file_format: 'any',
      columns_attributes: [...this.dataSource],
    };
  }

  setJsonToEmptyOrNull(jsonObject: any) {
    for (const key in jsonObject) {
      if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
        this.setJsonToEmptyOrNull(jsonObject[key]);
      } else {
        jsonObject[key] = null;
      }
    }
  }
}
