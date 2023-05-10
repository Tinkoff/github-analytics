import {HttpClient} from '@angular/common/http';
import {
    ErrorHandler,
    inject,
    Injectable,
    INJECTOR,
    Injector,
} from '@angular/core';
import {
    TuiAlertOptions,
    TuiAlertService,
    TuiLoaderComponent,
    tuiLoaderOptionsProvider,
    TuiNotification,
} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {
    catchError,
    finalize,
    map,
    Observable,
    of,
    startWith,
    switchMap,
    tap,
} from 'rxjs';

import {Issue} from '../interfaces/issue';
import {Label} from '../interfaces/label';
import {finalizeWithValue} from '../utils/finalize-with-value';

const LOADING: Partial<TuiAlertOptions<void>> = {
    hasIcon: false,
    status: TuiNotification.Warning,
    autoClose: false,
};

@Injectable({
    providedIn: 'root',
})
export class GithubService {
    private readonly alerts = inject(TuiAlertService);
    private readonly http = inject(HttpClient);
    private readonly error = inject(ErrorHandler);
    private readonly loader = new PolymorpheusComponent(
        TuiLoaderComponent,
        Injector.create({
            parent: inject(INJECTOR),
            providers: [tuiLoaderOptionsProvider({inheritColor: true})],
        }),
    );

    private readonly labels = new Map<string, string[] | null>();
    private readonly issues = new Map<string, Issue[] | null>();

    getLabels(repo: string): Observable<string[] | null> {
        const labels = this.labels.get(repo);

        return labels
            ? of(labels)
            : this.get<Label>(repo, 'labels').pipe(
                map((labels) => labels && labels.map(({name}) => name)),
                finalizeWithValue((labels) => this.labels.set(repo, labels)),
            );
    }

    getIssues(repo: string): Observable<Issue[] | null> {
        const issues = this.issues.get(repo);
        const loading: any =
            issues || this.alerts.open(this.loader, LOADING).subscribe();

        return issues
            ? of(issues)
            : this.get<Issue>(repo, 'issues').pipe(
                finalizeWithValue((issues) => this.issues.set(repo, issues)),
                finalize(() => loading.unsubscribe()),
            );
    }

    private get<T>(
        repo: string,
        what: 'labels' | 'issues',
    ): Observable<T[] | null> {
        return this.getRecursively<T>(repo, what).pipe(
            startWith(null),
            catchError((error) => {
                this.error.handleError(error);

                return of(null);
            }),
        );
    }

    private getRecursively<T>(
        repo: string,
        what: 'labels' | 'issues',
        page: number = 0,
    ): Observable<T[] | null> {
        const per_page = 100;

        return this.http
            .get<T[]>(`https://api.github.com/repos/${repo}/${what}`, {
                params: {page, per_page, state: 'all'},
            })
            .pipe(
                switchMap((stuff) =>
                    stuff.length < per_page
                        ? of(stuff)
                        : this.getRecursively<T>(repo, what, page + 1).pipe(
                            map((nextIssues) => nextIssues && [...stuff, ...nextIssues]),
                            startWith(stuff),
                        ),
                ),
            );
    }
}
