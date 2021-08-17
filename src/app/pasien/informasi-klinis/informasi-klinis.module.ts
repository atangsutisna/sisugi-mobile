import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformasiKlinisPageRoutingModule } from './informasi-klinis-routing.module';

import { InformasiKlinisPage } from './informasi-klinis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformasiKlinisPageRoutingModule
  ],
  declarations: [InformasiKlinisPage]
})
export class InformasiKlinisPageModule {}
