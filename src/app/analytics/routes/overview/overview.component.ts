import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { DataService } from '../../../services/data.service';
import { FiltersService } from '../../../services/filters.service';
import { TuiDay } from '@taiga-ui/cdk';
import { isMatch } from '../../../utils/is-match';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly data = inject(DataService);
  private readonly filters = inject(FiltersService);

  readonly issues$ = combineLatest([
    this.data.issues$,
    this.filters.getFilters$(),
  ]).pipe(
    map(([issues, filters]) =>
      issues?.reduce(
        (acc, issue) => {
          if (isMatch(issue, filters, 'closed_at')) {
            acc.closed++;
          }

          if (isMatch(issue, filters, 'created_at')) {
            acc.opened++;
          }

          return acc;
        },
        {
          opened: 0,
          closed: 0,
        },
      ),
    ),
  );
}
