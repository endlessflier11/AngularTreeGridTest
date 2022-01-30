import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnSettingData } from '../../utils/treegrid.interface';

@Component({
  selector: 'app-choose-dialog',
  templateUrl: './choose-dialog.component.html',
  styleUrls: ['./choose-dialog.component.css'],
})
export class ChooseDialogComponent implements OnInit {
  // @ViewChild('ejDialog') ejDialog: DialogComponent;

  public showCloseIcon: boolean = true;
  public animationSettings: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };
  private editSettings: Array<ColumnSettingData>;

  constructor(
    public dialogRef: MatDialogRef<ChooseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<ColumnSettingData>
  ) {}

  ngOnInit(): void {
    this.editSettings = this.data;
  }

  eventCheck(event, field) {
    this.editSettings = this.editSettings.map((column) =>
      column.field === field
        ? { ...column, visible: event.target.checked }
        : column
    );
  }

  isValidate(column) {
    if (column.chooserEnable && column.validate) return true;
    return false;
  }

  hideDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.editSettings);
  }
}
