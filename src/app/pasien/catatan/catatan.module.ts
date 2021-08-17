import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatatanPageRoutingModule } from './catatan-routing.module';

import { CatatanPage } from './catatan.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CatatanPageRoutingModule
  ],
  declarations: [CatatanPage]
})
export class CatatanPageModule {}
