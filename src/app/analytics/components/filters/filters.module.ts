import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputDateRangeModule, TuiInputMonthModule,
  TuiInputMonthRangeModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

import { FiltersComponent } from './filters.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiInputDateRangeModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputMonthRangeModule,
    TuiInputMonthModule,
  ],
  declarations: [FiltersComponent],
  exports: [FiltersComponent],
})
export class FiltersModule {}
