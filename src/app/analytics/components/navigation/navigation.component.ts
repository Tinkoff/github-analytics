import { ChangeDetectionStrategy, Component } from '@angular/core';

export const TABS = [
  {
    name: 'Overview',
    path: 'overview',
  },
  {
    name: 'Cumulative',
    path: 'cumulative',
  },
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly tabs = TABS;
}
