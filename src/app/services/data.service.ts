import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, retry, shareReplay, switchMap } from 'rxjs';
import { GithubService } from './github.service';
import { RepositoryService } from './repository.service';
import { Issue } from '../interfaces/issue';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly repository = inject(RepositoryService);
  private readonly github = inject(GithubService);

  readonly labels$ = this.repository.getRepository$().pipe(
    filter(Boolean),
    switchMap((repo) => this.github.getLabels(repo)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly issues$ = this.repository.getRepository$().pipe(
    filter(Boolean),
    switchMap((repo) => this.github.getIssues(repo)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
