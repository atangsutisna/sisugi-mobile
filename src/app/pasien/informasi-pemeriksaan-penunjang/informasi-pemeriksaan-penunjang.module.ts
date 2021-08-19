import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformasiPemeriksaanPenunjangPageRoutingModule } from './informasi-pemeriksaan-penunjang-routing.module';

import { InformasiPemeriksaanPenunjangPage } from './informasi-pemeriksaan-penunjang.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    InformasiPemeriksaanPenunjangPageRoutingModule
  ],
  declarations: [InformasiPemeriksaanPenunjangPage]
})
export class InformasiPemeriksaanPenunjangPageModule {}
