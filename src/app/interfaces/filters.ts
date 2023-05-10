import {TuiMonth} from '@taiga-ui/cdk';

export interface Filters {
    from: TuiMonth;
    to: TuiMonth;
    labels: string[];
}
