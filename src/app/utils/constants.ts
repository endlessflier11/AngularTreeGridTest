import { ColumnSettingData } from './treegrid.interface';

export const MENU_OPTIONS = [
  {
    text: 'AddNext',
    id: 'addNext',
    target: '.e-content',
  },
  { text: 'AddChild', id: 'addChild', target: '.e-content' },
  { text: 'DelRow', id: 'delRow', target: '.e-content' },
  { text: 'EditRow', id: 'editRow', target: '.e-content' },
  {
    text: 'MultiSelect',
    id: 'multiSelect',
    target: '.e-content',
    iconCss: 'e-check-icon unchecked',
  },
  { text: 'CopyRows', id: 'copyRows', target: '.e-content' },
  { text: 'CutRows', id: 'cutRows', target: '.e-content' },
  { text: 'PasteNext', id: 'pasteNext', target: '.e-content' },
  { text: 'PasteChild', id: 'pasteChild', target: '.e-content' },

  { text: 'EditCol', id: 'editCol', target: '.e-headercontent' },
  { text: 'NewCol', id: 'newCol', target: '.e-headercontent' },
  { text: 'DelCol', id: 'delCol', target: '.e-headercontent' },
  { text: 'ChooseCol', id: 'chooseCol', target: '.e-headercontent' },
  {
    text: 'FreezeCol',
    id: 'freezeCol',
    target: '.e-headercontent',
    iconCss: 'e-check-icon unchecked',
  },
  {
    text: 'FilterCol',
    id: 'filterCol',
    target: '.e-headercontent',
    iconCss: 'e-check-icon unchecked',
  },
  {
    text: 'MultiSort',
    id: 'multiSort',
    target: '.e-headercontent',
    iconCss: 'e-check-icon unchecked',
  },
];

export const ALIGNMENTS_TYPES = ['Left', 'Center', 'Right'];

export const primaryKey = 'ID';

export const DEFAULT_KEYS = {
  id: primaryKey,
  field: 'NAME',
  year: 'YEAR',
  stint: 'STINT',
};

export const NEW_COLUMN_FIELDS = [
  'NEWFIELD00',
  'NEWFIELD01',
  'NEWFIELD02',
  'NEWFIELD03',
  'NEWFIELD04',
  'NEWFIELD05',
  'NEWFIELD06',
  'NEWFIELD07',
  'NEWFIELD08',
  'NEWFIELD09',
  'NEWFIELD10',
  'NEWFIELD11',
  'NEWFIELD12',
  'NEWFIELD13',
  'NEWFIELD14',
  'NEWFIELD15',
  'NEWFIELD16',
  'NEWFIELD17',
  'NEWFIELD18',
  'NEWFIELD19',
];

export const default_column_setting: ColumnSettingData = {
  field: 'NEW_FIELD',
  label: 'New Column',
  type: 'string',
  defaultValue: null,
  minWidth: 120,
  fontSize: 13,
  fontColor: '#212529',
  bgColor: '#ffffff',
  alignment: 'Right',
  textWrap: false,
  frozen: false,
  visible: false,
  chooserEnable: true,
  validate: false,
};

const staticColumnSettings: ColumnSettingData[] = [
  {
    ...default_column_setting,
    field: primaryKey,
    label: 'ID',
    type: 'number',
    defaultValue: 0,
    visible: true,
    validate: true,
  },
  {
    ...default_column_setting,
    field: DEFAULT_KEYS.field,
    label: 'Name',
    type: 'string',
    defaultValue: 'New Player',
    alignment: 'Left',
    chooserEnable: false,
    visible: true,
    validate: true,
  },
  {
    ...default_column_setting,
    field: DEFAULT_KEYS.year,
    label: 'Year',
    type: 'number',
    defaultValue: 1980,
    visible: true,
    validate: true,
  },
  {
    ...default_column_setting,
    field: DEFAULT_KEYS.stint,
    label: 'Stint',
    type: 'number',
    defaultValue: 0,
    visible: true,
    validate: true,
  },
];

export const DEFAULT_COLUMNS_SETTINGS: ColumnSettingData[] = [
  ...staticColumnSettings,
  ...NEW_COLUMN_FIELDS.map((field) => ({
    ...default_column_setting,
    field: field,
  })),
];

export const COLUMN_TYPES = ['string', 'number', 'date', 'boolean'];

export const ALIGNMENTS = ['Left', 'Center', 'Right'];
