import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatypeDialogComponent } from '../datatype-dialog/datatype-dialog.component';
import { MatTable } from '@angular/material/table';
import { ApiData, Options, TableData } from '../datatypes/api';
import { OptionDialogComponent } from '../option-dialog/option-dialog.component';
import { DataService } from '../service/data.service';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
  resultSet: any;
  fileFormat: any;

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
        min_date: new Date('2020-01-01'),
        max_date: new Date('2023-06-01'),
        value: [],
        country_code: '',
        is_random: true,
        size: undefined,
        html_value: undefined,
        format: '',
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
    this.dataService.getData(this.jsonBody).subscribe(
      (val) => {
        console.log(val);
        this.resultSet = val;
      },
      (err) => console.log(err),
      () => {
        const dialogRef = this.dialog.open(PreviewDialogComponent, {
          panelClass: 'my-preview-dialog-class',
          data: this.resultSet,
        });
      }
    );
  }

  generateData() {
    this.settingUpJsonBody(this.rows);
    this.dataService.getData(this.jsonBody).subscribe(
      (val) => {
        console.log(val);
        this.resultSet = val;
      },
      (err) => console.log(err),
      () => {
        if (this.fileFormat === 'sql') {
          this.exportSQL(this.resultSet, this.tableName);
        } else if (this.fileFormat === 'excel') {
          this.exportExcel(this.resultSet);
        } else if (this.fileFormat === 'json') {
          this.exportJSON(this.resultSet);
        }
      }
    );
  }

  settingUpJsonBody(rowCount: any) {
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

  generateInsertQuery(jsonArray: any, tableName: any) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      throw new Error('jsonData must be a non-empty array of JSON objects.');
    }

    const keys = Object.keys(jsonArray[0]);
    const valueRows = jsonArray
      .map((jsonData) => {
        return `(${Object.values(jsonData)
          .map((val) => {
            if (typeof val === 'string') return `'${val}'`;
            return val;
          })
          .join(', ')})`;
      })
      .join(',\n');

    const insertQuery = `INSERT INTO ${tableName} (${keys.join(
      ', '
    )}) VALUES \n${valueRows};`;

    return insertQuery;
  }

  exportSQL(jsonDataArray: any, tableName: any) {
    const insertQuery = this.generateInsertQuery(jsonDataArray, tableName);
    const blob = new Blob([insertQuery], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'output.sql');
  }

  exportExcel(jsonDataArray: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDataArray);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(excelBlob, 'output.xlsx');
  }

  exportJSON(jsonDataArray: any) {
    const insertQuery = JSON.stringify(jsonDataArray);
    const blob = new Blob([insertQuery], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'output.json');
  }
}
