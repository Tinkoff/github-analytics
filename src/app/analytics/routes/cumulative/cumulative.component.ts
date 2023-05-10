import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiDay, TuiMonth, tuiPure} from '@taiga-ui/cdk';
import {combineLatest, filter, map} from 'rxjs';

import {Issue} from '../../../interfaces/issue';
import {Filters} from '../../../interfaces/filters';
import {isMatch} from '../../../utils/is-match';
import {DataService} from '../../../services/data.service';
import {FiltersService} from '../../../services/filters.service';

interface Charts {
    readonly opened: readonly [TuiDay, number][];
    readonly closed: readonly [TuiDay, number][];
}

@Component({
    selector: 'app-cumulative',
    templateUrl: './cumulative.component.html',
    styleUrls: ['./cumulative.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CumulativeComponent {
    private readonly issues$ = inject(DataService).issues$;
    private readonly filters$ = inject(FiltersService).getFilters$();

    readonly data$ = combineLatest([
        this.issues$.pipe(filter(Boolean)),
        this.filters$,
    ]).pipe(map((data) => this.filter(...data)));

    @tuiPure
    getHeight({opened, closed}: Charts): number {
        const max = Math.max(
            opened[opened.length - 1][1],
            closed[opened.length - 1][1],
        );
        const magnitude = Math.pow(10, String(max).length);
        const ceil = max / magnitude > 0.5 ? magnitude : magnitude / 10;

        return Math.ceil(max / ceil) * ceil;
    }

    @tuiPure
    getYLabels(max: number): string[] {
        const length = max % 4 ? 3 : 5;

        return Array.from({length}, (_, index) =>
            String((index * max) / (length - 1)),
        );
    }

    @tuiPure
    getXLabels({opened}: Charts): string[] {
        const months = opened
            .filter(([{month}], index) => month !== opened[index - 1]?.[0].month)
            .map(([day]) => String(day));
        const length = 6;
        const skip = Math.ceil(months.length / length);

        return months.length > length
            ? months.filter((_, i) => !(i % skip))
            : months;
    }

    private filter(issues: Issue[], filters: Filters): Charts {
        const opened = this.getArray(filters);
        const closed = this.getArray(filters);

        issues.forEach((issue) => {
            if (isMatch(issue, filters, 'created_at')) {
                opened[this.lengthTo(filters.from, issue['created_at'])][1] += 1;
            }

            if (isMatch(issue, filters, 'closed_at')) {
                closed[this.lengthTo(filters.from, issue['closed_at'])][1] += 1;
            }
        });

        for (let index = 1; index < opened.length; index++) {
            opened[index][1] += opened[index - 1][1];
            closed[index][1] += closed[index - 1][1];
        }

        return {opened, closed};
    }

    private getArray({from, to}: Filters): [TuiDay, number][] {
        const start = new TuiDay(from.year, from.month, 1);
        const end = new TuiDay(to.year, to.month, to.daysCount);
        const today = TuiDay.currentLocal();

        return new Array(
            TuiDay.lengthBetween(start, end.daySameOrAfter(today) ? today : end) + 1,
        )
            .fill(0)
            .map((_, day) => [start.append({day}), 0]);
    }

    private lengthTo({month, year}: TuiMonth, date: string | null): number {
        return TuiDay.lengthBetween(
            new TuiDay(year, month, 1),
            TuiDay.fromLocalNativeDate(new Date(date || 0)),
        );
    }
}
