import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnSettingData } from '../../utils/treegrid.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  public showCloseIcon: boolean = true;
  public animationSettings: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<ColumnSettingData>
  ) {}

  ngOnInit(): void {}

  hideDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close('ok');
  }
}
