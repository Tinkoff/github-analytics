import { Issue } from '../interfaces/issue';
import { Filters } from '../interfaces/filters';
import { TuiDay } from '@taiga-ui/cdk';

export function isMatch(
  issue: Issue,
  { from, to, labels }: Filters,
  action: 'closed_at' | 'created_at' = 'created_at',
): boolean {
  const start = new TuiDay(from.year, from.month, 1);
  const end = new TuiDay(to.year, to.month, to.daysCount);
  const value = issue[action];
  const day = value && TuiDay.fromLocalNativeDate(new Date(value));
  const date = day && day.daySameOrAfter(start) && day.daySameOrBefore(end);
  const filtered =
    !issue.pull_request &&
    (!labels.length ||
      labels.some((label) => issue.labels.find(({ name }) => name === label)));

  return !!date && filtered;
}
