import {TuiRootModule, TuiDialogModule, TuiAlertModule} from '@taiga-ui/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AnalyticsModule} from './analytics/analytics.module';
import {ErrorService} from './services/error.service';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
        AnalyticsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
    ],
    providers: [{provide: ErrorHandler, useClass: ErrorService}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
