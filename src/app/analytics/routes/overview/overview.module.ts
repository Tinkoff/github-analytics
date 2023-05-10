import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiTagModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    CommonModule,
    TuiTagModule,
    RouterModule.forChild([{ path: '', component: OverviewComponent }]),
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule {}
