import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EditDialogData,
  ColumnSettingData,
} from '../../utils/treegrid.interface';
import {} from 'src/app/utils/constants';
import { COLUMN_TYPES, ALIGNMENTS } from 'src/app/utils/constants';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  public showCloseIcon: boolean = true;
  public animationSettings: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };
  public dataTypes = COLUMN_TYPES;
  public alignments = ALIGNMENTS;
  public editorForm: FormGroup;
  columnsSettings: Array<ColumnSettingData>;
  selectedField: string;
  columnSettingData: ColumnSettingData;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {}

  ngOnInit(): void {
    this.selectedField = this.data.field;
    this.columnsSettings = this.data.columnsSettings;
    this.columnSettingData = this.columnsSettings.find(
      (item) => item.field === this.selectedField
    );
    this.editorForm = this._fb.group({
      firstname: 'edit-dialog',
      alignmentControl: [this.columnSettingData.alignment],
      dataTypeControl: [this.columnSettingData.type],
    });
    this.editorForm.get('alignmentControl').valueChanges.subscribe((f) => {
      this.onChangeAlignment(f);
    });
    this.editorForm.get('dataTypeControl').valueChanges.subscribe((f) => {
      this.onChangeType(f);
    });
  }

  onChangeAlignment(value) {
    this.columnSettingData = { ...this.columnSettingData, alignment: value };
  }

  onChangeType(value) {
    this.columnSettingData = { ...this.columnSettingData, type: value };
  }

  onChangeEdit(event, key) {
    this.columnSettingData = {
      ...this.columnSettingData,
      [key]: event.target.value,
    };
  }

  hideDialog() {
    this.dialogRef.close();
  }

  validateCheck() {
    if (this.columnSettingData.label.trim().length === 0) return false;
    // if (this.columnSettingData.defaultValue.trim().length === 0) return false;
    if (this.columnSettingData.minWidth > 400) return false;
    return true;
  }

  saveSettings() {
    if (this.validateCheck()) {
      this.columnsSettings = this.columnsSettings.reduce((result, column) => {
        if (column.field === this.selectedField)
          return [...result, this.columnSettingData];
        return [...result, column];
      }, []);
      this.dialogRef.close(this.columnsSettings);
    }
  }
}
