import { incMaxRows } from '../jsontreegriddata';
import { primaryKey } from './constants';
import { ColumnSettingData } from './treegrid.interface';

const idField = primaryKey;
const parentField = 'parent';
const childsField = 'childs';

export function getNewRecord(parent, columnSettings: ColumnSettingData[]) {
  const id = incMaxRows();
  const newRecord = columnSettings.reduce((result, column) => {
    return {...result, [column.field]: column.defaultValue}
  }, {});
  const updatedRecord = {...newRecord,  [primaryKey]: id, parent, childs: [] }
  return updatedRecord;
}

export function insertRow(
  data: Object[],
  rowIndex: number,
  newRecord: Object,
  type: string
) {
  const newData = [];
  data.forEach((row) => {
    if (row[idField] === rowIndex) {
      if (type === 'next') {
        newData.push(row);
        newData.push({ ...newRecord, parent: row[parentField] });
      } else {
        newData.push({
          ...row,
          parent: row[parentField],
          childs: [{ ...newRecord, parent: row[idField] }],
        });
      }
    } else if (row[childsField].length > 0) {
      newData.push({
        ...row,
        childs: insertRow(row[childsField], rowIndex, newRecord, type),
      });
    } else {
      newData.push(row);
    }
  });
  return newData;
}

export function deleteRows(data: Object[], rowIndexs: number[]) {
  const newData = [];
  data.forEach((row) => {
    if (!rowIndexs.includes(row[idField])) {
      if (row[childsField].length > 0) {
        newData.push({
          ...row,
          childs: deleteRows(row[childsField], rowIndexs),
        });
      } else {
        newData.push(row);
      }
    }
  });
  return newData;
}

export function updateCopiedRows(data: Array<any>, fields: string[]) {
  const advancedData = [];
  data.forEach((row) => {
    const omittedRow = Object.fromEntries(fields.map((key) => [key, row[key]]));

    if (omittedRow[childsField].length > 0) {
      advancedData.push({
        ...omittedRow,
        [idField]: incMaxRows(),
        [childsField]: updateCopiedRows(omittedRow[childsField], fields),
      });
    } else {
      advancedData.push({ ...omittedRow, [idField]: incMaxRows() });
    }
  });
  return advancedData;
}

export function pasteNextRows(
  data: Array<any>,
  insertTaskID: number,
  copiedRows: Array<any>
) {
  const newData = [];
  data.forEach((row) => {
    if (row[idField] === insertTaskID) {
      newData.push(row);
      copiedRows.forEach((newRow) => {
        newData.push({
          ...newRow,
          parent: row[parentField],
        });
      });
    } else if (row[childsField].length > 0) {
      newData.push({
        ...row,
        childs: pasteNextRows(row[childsField], insertTaskID, copiedRows),
      });
    } else {
      newData.push(row);
    }
  });
  return newData;
}

export function pasteChildRows(
  data: Array<any>,
  insertTaskID: number,
  copiedRows: Array<any>
) {
  const newData = [];
  data.forEach((row) => {
    if (row[idField] === insertTaskID) {
      newData.push({
        ...row,
        childs: copiedRows
          .map((newRow) => ({
            ...newRow,
            parent: row[parentField],
          }))
          .concat(row[childsField]),
      });
    } else if (row[childsField].length > 0) {
      newData.push({
        ...row,
        childs: pasteChildRows(row[childsField], insertTaskID, copiedRows),
      });
    } else {
      newData.push(row);
    }
  });
  return newData;
}
