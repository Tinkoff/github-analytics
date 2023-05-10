import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class ErrorService extends ErrorHandler {
  private readonly alerts = inject(TuiAlertService);
  private readonly zone = inject(NgZone);

  override handleError({ message, name, stack }: Error): void {
    console.error(stack);

    this.zone.run(() =>
      this.alerts
        .open(message, { label: name, status: TuiNotification.Error })
        .subscribe(),
    );
  }
}
