import { SparklineAllModule } from '@syncfusion/ej2-angular-charts';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {
  DropDownListAllModule,
  MultiSelectAllModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  ContextMenuModule,
  ToolbarModule,
  ToolbarAllModule,
} from '@syncfusion/ej2-angular-navigations';
import {
  ButtonAllModule,
  CheckBoxAllModule,
} from '@syncfusion/ej2-angular-buttons';
import {
  DatePickerModule,
  DatePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChooseDialogComponent } from './components/choose-dialog/choose-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [AppComponent, EditDialogComponent, ChooseDialogComponent, ConfirmDialogComponent, CoursesComponent],
  imports: [
    MaterialModule,
    CommonModule,
    HttpModule,
    TreeGridAllModule,
    NumericTextBoxAllModule,
    ToolbarModule,
    DropDownListAllModule,
    ButtonAllModule,
    DialogModule,
    MultiSelectAllModule,
    CheckBoxAllModule,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModule,
    SparklineAllModule,
    BrowserModule,
    BrowserAnimationsModule,
    ContextMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
