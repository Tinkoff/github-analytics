import {NgModule} from '@angular/core';
import {TuiTabsModule} from '@taiga-ui/kit';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NavigationComponent} from './navigation.component';

@NgModule({
    imports: [CommonModule, TuiTabsModule, RouterModule],
    declarations: [NavigationComponent],
    exports: [NavigationComponent],
})
export class NavigationModule {
}
