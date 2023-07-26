import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.css'],
})
export class PreviewDialogComponent implements OnInit {
  displayedColumns: any[] = [];
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.displayedColumns = Array.from(
      this.data.reduce((acc: any, obj: any) => {
        Object.keys(obj).forEach((key) => acc.add(key));
        return acc;
      }, new Set())
    );

    this.dataSource = new MatTableDataSource(this.data);
  }

  ok() {
    this.dialogRef.close();
  }
}
