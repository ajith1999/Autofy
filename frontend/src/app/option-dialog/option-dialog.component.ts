import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Options } from '../datatypes/api';

@Component({
  selector: 'app-option-dialog',
  templateUrl: './option-dialog.component.html',
  styleUrls: ['./option-dialog.component.css'],
})
export class OptionDialogComponent implements OnInit {
  public naming_series: string | undefined;
  public min: number | undefined;
  public max: number | undefined;
  public custom_field: string;
  public country_code: string;
  public min_date: Date | undefined;
  public max_date: Date | undefined;
  public html_value: string;
  public outputData: Options;

  constructor(
    public dialogRef: MatDialogRef<OptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.outputData = {
      min: undefined,
      max: undefined,
      min_date: undefined,
      max_date: undefined,
      value: [],
      country_code: '',
      is_random: undefined,
      size: undefined,
      html_value: undefined,
    };
  }

  sendData() {
    if (this.data.datatype === 'number') {
      this.outputData.min = this.min;
      this.outputData.max = this.max;
      this.outputData.html_value = this.min + '-' + this.max;
      this.dialogRef.close(this.outputData);
    } else if (this.data.datatype === 'custom_field') {
      // logic to split customfield
      const commaSeparatedString = this.custom_field;
      const valuesArray = commaSeparatedString?.split(',');
      this.outputData.value = valuesArray;
      this.outputData.html_value = commaSeparatedString;
      this.dialogRef.close(this.outputData);
    } else if (this.data.datatype === 'naming_series') {
      //logic for naming_series
      const stringValue = this.naming_series;
      let valueArray = [];
      valueArray.push(stringValue);
      this.outputData.value = valueArray;
      this.outputData.html_value = valueArray[0];
      this.dialogRef.close(this.outputData);
    } else if (this.data.datatype === 'country_code') {
      //logic for country code
      this.outputData.country_code = this.country_code;
      this.outputData.html_value = this.country_code;
      this.dialogRef.close(this.outputData);
    } else if (this.data.datatype === 'date_time') {
      // logic for date time
      this.dialogRef.close(this.outputData);
    }
  }
}
