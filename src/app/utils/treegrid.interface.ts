export interface EditDialogData {
  draft: boolean;
  field: string;
  columnsSettings: Array<ColumnSettingData>;
}

export interface ColumnSettingData {
  field: string;
  label: string;
  type: string;
  defaultValue: any;
  minWidth: number;
  fontSize: number;
  fontColor: string;
  bgColor: string;
  alignment: string;
  textWrap: boolean;
  frozen: boolean;
  visible: boolean;
  chooserEnable: boolean;
  validate: boolean;
}
