import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Filters} from '../interfaces/filters';
import {TuiMonth} from '@taiga-ui/cdk';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    private readonly router = inject(Router);

    private readonly filters$ = new BehaviorSubject(
        this.parseRoute(inject(ActivatedRoute)),
    );

    setFilters(filters: Filters) {
        this.filters$.next(filters);
        this.router.navigate([], {queryParams: filters});
    }

    getFilters(): Filters {
        return this.filters$.value;
    }

    getFilters$(): Observable<Filters> {
        return this.filters$;
    }

    parseRoute({snapshot}: ActivatedRoute): Filters {
        return Object.keys(snapshot.queryParams).length
            ? {
                from: parseMonth(snapshot.queryParams['from']),
                to: parseMonth(snapshot.queryParams['to']),
                labels: snapshot.queryParams['labels'] || [],
            }
            : {
                from: TuiMonth.currentUtc().append({month: -3}),
                to: TuiMonth.currentUtc(),
                labels: [],
            };
    }
}

function parseMonth(month: string): TuiMonth {
    const [monthIndex, year] = month.split('.').map(Number);

    return new TuiMonth(year, monthIndex - 1);
}
