import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  TUI_IS_MOBILE,
  TuiDay,
  TuiDayRange,
  TuiMonth,
  TuiMonthRange,
} from '@taiga-ui/cdk';
import { filter, map, share, startWith } from 'rxjs';

import { FiltersService } from '../../../services/filters.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  private readonly filters = inject(FiltersService);

  readonly isMobile = inject(TUI_IS_MOBILE);
  readonly max = TuiMonth.currentLocal();
  readonly min$ = inject(DataService).issues$.pipe(
    filter(Boolean),
    map((issues) =>
      TuiDay.fromLocalNativeDate(
        new Date(issues[issues.length - 1]?.created_at),
      ),
    ),
    startWith(this.max),
    share(),
  );

  @Input() labels: string[] = [];

  range = new TuiMonthRange(
    this.filters.getFilters().from,
    this.filters.getFilters().to,
  );

  selected: string[] = this.filters.getFilters().labels;

  onRangeChange(range: TuiDayRange): void {
    this.range = range;
    this.filters.setFilters({
      from: range.from,
      to: range.to,
      labels: this.selected,
    });
  }

  onLabelsChange(labels: string[]): void {
    this.selected = labels;
    this.filters.setFilters({
      from: this.range.from,
      to: this.range.to,
      labels,
    });
  }

  onFrom(from: TuiMonth): void {
    const to = this.range.to.monthBefore(from) ? from : this.range.to;

    this.range = new TuiMonthRange(from, to);
    this.filters.setFilters({
      from,
      to,
      labels: this.selected,
    });
  }

  onTo(to: TuiMonth): void {
    const from = this.range.from.monthAfter(to) ? to : this.range.from;

    this.range = new TuiMonthRange(from, to);
    this.filters.setFilters({
      from,
      to,
      labels: this.selected,
    });
  }
}
