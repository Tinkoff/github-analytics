import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositoryModule } from './components/repository/repository.module';
import { FiltersModule } from './components/filters/filters.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { RouterModule, Routes } from '@angular/router';
import { TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';

const ROUTES: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
  },
  {
    path: ':owner/:repository',
    component: AnalyticsComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./routes/overview/overview.module').then(
            (m) => m.OverviewModule,
          ),
      },
      {
        path: 'cumulative',
        loadChildren: () =>
          import('./routes/cumulative/cumulative.module').then(
            (m) => m.CumulativeModule,
          ),
      },
      {
        path: '**',
        redirectTo: 'overview',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoryModule,
    FiltersModule,
    NavigationModule,
    RouterModule.forChild(ROUTES),
    TuiExpandModule,
    TuiButtonModule,
  ],
  declarations: [AnalyticsComponent],
  exports: [AnalyticsComponent],
})
export class AnalyticsModule {}
