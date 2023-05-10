import { NgModule } from '@angular/core';
import { RepositoryComponent } from './repository.component';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiTagModule} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import {TuiFocusableModule} from "@taiga-ui/cdk";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTagModule,
    TuiTextfieldControllerModule,
    TuiFocusableModule,
  ],
  declarations: [RepositoryComponent],
  exports: [RepositoryComponent],
})
export class RepositoryModule {}
