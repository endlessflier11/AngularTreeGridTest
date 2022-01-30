import { Component, OnInit, ViewChild } from '@angular/core';
import {
  TreeGridComponent,
  EditService,
  EditSettingsModel,
  extendArray,
  Column,
} from '@syncfusion/ej2-angular-treegrid';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { TextAlign, SortEventArgs } from '@syncfusion/ej2-grids';
import { MatDialog } from '@angular/material/dialog';

import { dataSource, virtualData, sampleData } from './jsontreegriddata';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ChooseDialogComponent } from './components/choose-dialog/choose-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {
  getNewRecord,
  insertRow,
  deleteRows,
  pasteNextRows,
  pasteChildRows,
  updateCopiedRows,
} from './utils/dataProcessing';
import { updateContextMenuHtml } from './utils/menuProcessing';
import {
  MENU_OPTIONS,
  DEFAULT_COLUMNS_SETTINGS,
  primaryKey,
} from './utils/constants';
import { EditDialogData } from './utils/treegrid.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [EditService],
})
export class AppComponent {
  public title: string = 'TreeGrid';
  public data: Object[] = [];
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

  // maps the appropriate column to fields property
  public columnsSettings = DEFAULT_COLUMNS_SETTINGS;
  public allowDragAndDrop: boolean = true;
  public editSettings: EditSettingsModel;
  private copiedRows: Object[];

  public contextMenuItems: MenuItemModel[] = MENU_OPTIONS;
  public multiSelectChecked = false;
  public filterChecked = false;
  public multiSortChecked = false;
  public frozenChecked = false;
  private selectedColumnField: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    dataSource();
    this.data = virtualData;
    // this.data = sampleData;
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowEditOnDblClick: false,
      mode: 'Row',
    };
  }

  load() {
    this.treegrid.filterSettings.hierarchyMode = 'Parent';
  }

  // NOTE: Column Operations
  updateColumns() {
    for (const cols of this.treegrid.columns) {
      const columnItem = this.columnsSettings.find(
        (item) => item.field === (cols as Column).field
      );
      const customStyle = {
        background: columnItem.bgColor,
        color: columnItem.fontColor,
        'font-size': `${columnItem.fontSize}px`,
      };
      (cols as Column).headerText = columnItem.label;
      (cols as Column).minWidth = columnItem.minWidth;
      (cols as Column).textAlign = columnItem.alignment as TextAlign;
      (cols as Column).type = columnItem.type;
      (cols as Column).customAttributes = { style: customStyle };
      (cols as Column).visible = columnItem.visible;
    }
    this.treegrid.refreshColumns();
  }

  openNewEditDialog(draft: boolean): void {
    const newColumn = this.columnsSettings.find(
      (item) => item.field.includes('NEWFIELD') && !item.visible
    );
    const sendingParameter: EditDialogData = {
      draft,
      field: draft ? newColumn.field : this.selectedColumnField,
      columnsSettings: this.columnsSettings,
    };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: sendingParameter,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!draft) {
        if (result) {
          this.columnsSettings = result;
        }
      } else if (result) {
        this.columnsSettings = result.reduce((settings, column) => {
          if (column.field === newColumn.field)
            return [...settings, { ...column, visible: true, validate: true }];
          return [...settings, column];
        }, []);
      }
      this.updateColumns();
    });
  }

  actionComplete(args): void {
    // console.log('actionComplete=', args);
    // if (args.requestType == 'refresh') {
    // }
  }

  editColumn() {
    this.openNewEditDialog(false);
  }

  newColumn() {
    this.openNewEditDialog(true);
  }

  delColumn() {
    const matchedColumn = this.columnsSettings.find(
      (column) => column.field === this.selectedColumnField
    );
    const field = matchedColumn ? matchedColumn.label : 'this';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: field,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.columnsSettings = this.columnsSettings.reduce(
          (settings, column) => {
            if (column.field === matchedColumn.field)
              return [
                ...settings,
                { ...column, visible: false, validate: false },
              ];
            return [...settings, column];
          },
          []
        );
        this.updateColumns();
      }
    });
  }

  chooseColumn() {
    const dialogRef = this.dialog.open(ChooseDialogComponent, {
      data: this.columnsSettings,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.columnsSettings = result;
        this.updateColumns();
      }
    });
  }

  freezeColumn() {
    // const filteredSettings = this.columnsSettings.map((column) =>
    //   column.field === this.selectedColumnField
    //     ? { ...column, frozen: !column.frozen }
    //     : column
    // );
    // const sortedSettings = filteredSettings.sort((a) => {
    //   if (a.frozen) return -1;
    //   else return 1;
    // });
    // this.columnsSettings = sortedSettings;
    // const frozenColumns = this.columnsSettings.filter(
    //   (column) => column.frozen
    // ).length;
    // this.treegrid.frozenColumns = frozenColumns;
    this.frozenChecked = !this.frozenChecked;
    if (this.frozenChecked) this.treegrid.frozenColumns = 2;
    else this.treegrid.frozenColumns = 0;
  }

  filterColumn() {
    this.filterChecked = !this.filterChecked;
    this.treegrid.allowFiltering = this.filterChecked;
  }

  mulitSortColumn() {
    this.multiSortChecked = !this.multiSortChecked;
    this.treegrid.allowSorting = this.multiSortChecked;
    if (this.multiSortChecked) {
      const sortSettings: Object = {
        columns: this.columnsSettings.map((column) => ({
          field: column.field,
          direction: 'Ascending',
        })),
      };
      this.treegrid.sortSettings = sortSettings;
    }
  }

  // NOTE: Row Operations
  addNext(rowIndex: number) {
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const newDataSource = insertRow(
      dataSource as object[],
      rowIndex,
      getNewRecord(-1, this.columnsSettings),
      'next'
    );
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  addChild(rowIndex: number) {
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const newDataSource = insertRow(
      dataSource as object[],
      rowIndex,
      getNewRecord(rowIndex, this.columnsSettings),
      'child'
    );
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  delRow(rowIndex: number) {
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const newDataSource = deleteRows(dataSource as object[], [rowIndex]);
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  editRow(rowIndex: number) {
    this.treegrid.startEdit();
  }

  multiSelect() {
    this.multiSelectChecked = !this.multiSelectChecked;
    if (this.multiSelectChecked) {
      this.treegrid.selectionSettings.type = 'Multiple';
    } else {
      this.treegrid.selectionSettings.type = 'Single';
    }
  }

  copyRows() {
    this.copiedRows = this.treegrid.getSelectedRecords();
  }

  cutRows() {
    this.copiedRows = this.treegrid.getSelectedRecords();
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const newDataSource = deleteRows(
      dataSource as object[],
      this.copiedRows.map((row) => row[primaryKey])
    );
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  pasteNext(rowIndex: number) {
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const fields = this.columnsSettings.reduce(
      (result, field) => {
        return [...result, field.field];
      },
      ['parent', 'childs']
    );
    const newDataSource = pasteNextRows(
      dataSource as object[],
      rowIndex,
      updateCopiedRows(this.copiedRows, fields)
    );
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  pasteChild(rowIndex: number) {
    const dataSource = extendArray(this.treegrid.dataSource as object[]);
    const fields = this.columnsSettings.reduce(
      (result, field) => {
        return [...result, field.field];
      },
      ['parent', 'childs']
    );
    const newDataSource = pasteChildRows(
      dataSource as object[],
      rowIndex,
      updateCopiedRows(this.copiedRows, fields)
    );
    this.treegrid.dataSource = newDataSource; // Refresh the TreeGrid.
  }

  contextMenuOpen(args: any): void {
    this.selectedColumnField = args.column?.field;
    args.element.innerHTML = updateContextMenuHtml(
      args.event.target.className === 'e-headertext' ||
        args.event.target.className.includes('e-headercell'),
      this.contextMenuItems,
      this.multiSelectChecked,
      this.filterChecked,
      this.multiSortChecked,
      this.frozenChecked,
      this.columnsSettings,
      this.selectedColumnField
    );
  }

  contextMenuClick(args?: any): void {
    const menuId = args.item.id;
    switch (menuId) {
      // NOTE: column actions
      case 'editCol':
        this.editColumn();
        break;
      case 'newCol':
        this.newColumn();
        break;
      case 'delCol':
        this.delColumn();
        break;
      case 'chooseCol':
        this.chooseColumn();
        break;
      case 'freezeCol':
        this.freezeColumn();
        break;
      case 'filterCol':
        this.filterColumn();
        break;
      case 'multiSort':
        this.mulitSortColumn();
        break;

      // NOTE: row actions
      case 'addNext':
        this.addNext(args.rowInfo.rowData[primaryKey]);
        break;
      case 'addChild':
        this.addChild(args.rowInfo.rowData[primaryKey]);
        break;
      case 'delRow':
        this.delRow(args.rowInfo.rowData[primaryKey]);
        break;
      case 'editRow':
        this.editRow(args.rowInfo.rowData[primaryKey]);
        break;
      case 'multiSelect':
        this.multiSelect();
        break;
      case 'copyRows':
        this.copyRows();
        break;
      case 'cutRows':
        this.cutRows();
        break;
      case 'pasteNext':
        this.pasteNext(args.rowInfo.rowData[primaryKey]);
        break;
      case 'pasteChild':
        this.pasteChild(args.rowInfo.rowData[primaryKey]);
        break;
      default:
        return;
    }
  }
}
