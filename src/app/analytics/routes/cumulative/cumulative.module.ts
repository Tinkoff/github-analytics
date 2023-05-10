import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiAxesModule, TuiLineDaysChartModule} from '@taiga-ui/addon-charts';
import {TuiMapperPipeModule} from '@taiga-ui/cdk';
import {RouterModule} from '@angular/router';

import {CumulativeComponent} from './cumulative.component';

@NgModule({
    imports: [
        CommonModule,
        TuiAxesModule,
        TuiLineDaysChartModule,
        TuiMapperPipeModule,
        RouterModule.forChild([{path: '', component: CumulativeComponent}]),
    ],
    declarations: [CumulativeComponent],
    exports: [CumulativeComponent],
})
export class CumulativeModule {
}
