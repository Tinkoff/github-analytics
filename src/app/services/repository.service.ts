import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private readonly router = inject(Router);

  private repository$ = new BehaviorSubject<string>(
    this.parseRoute(inject(ActivatedRoute)),
  );

  setRepository(repository: string) {
    this.repository$.next(repository);
    this.router.navigate([repository, ...this.router.url.split('/').slice(3)], {
      queryParamsHandling: 'merge',
    });
  }

  getRepository(): string {
    return this.repository$.value;
  }

  getRepository$(): Observable<string> {
    return this.repository$;
  }

  parseRoute({ firstChild }: ActivatedRoute): string {
    return firstChild?.snapshot.params['owner']
      ? `${firstChild?.snapshot.params['owner']}/${firstChild?.snapshot.params['repository']}`
      : '';
  }
}
