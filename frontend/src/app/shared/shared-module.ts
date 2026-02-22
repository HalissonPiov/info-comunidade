import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

import { CardComponent } from '../components/card-component/card-component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CardComponent,
    MatDialogModule,
    MatTab,
    MatTabGroup
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CardComponent,
    MatTab,
    MatTabGroup,
    MatDialogModule
  ]
})
export class SharedModule { }
