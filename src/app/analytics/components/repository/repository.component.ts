import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { tuiFadeIn, tuiHeightCollapse } from '@taiga-ui/core';

import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.less'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        pattern: 'Please provide a valid repository',
        required: 'Please provide a repository',
      },
    },
  ],
  animations: [tuiHeightCollapse, tuiFadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent {
  private readonly repository = inject(RepositoryService);
  private readonly localStorage = inject(LOCAL_STORAGE);

  readonly control = new FormControl<string>(this.repository.getRepository(), [
    Validators.required,
    Validators.pattern(
      /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}\/[a-zA-Z0-9_\-.]{1,100}$/
    ),
  ]);

  readonly suggestions = [
    'tinkoff/taiga-ui',
    'tinkoff/maskito',
    'tinkoff/ng-morph',
  ];

  stored = this.localStorage.getItem('repos')?.split(',') || [];

  get submitted(): boolean {
    return this.control.valid && this.control.pristine;
  }

  remove(item: string) {
    this.stored = this.stored.filter((value) => value !== item);

    if (!this.stored.length) {
      this.localStorage.removeItem('repos');
    } else {
      this.localStorage.setItem('repos', this.stored.join(','));
    }
  }

  onSubmit(): void {
    const repo = this.control.value || '';

    this.control.markAsPristine();
    this.repository.setRepository(repo);

    if (this.suggestions.includes(repo) || this.stored.includes(repo)) {
      return;
    }

    this.stored = this.stored.concat(repo);
    this.localStorage.setItem('repos', this.stored.join(','));
  }
}
