import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent {
  readonly data = inject(DataService);
  open = !inject(TUI_IS_MOBILE);
}
