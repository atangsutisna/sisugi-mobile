import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformasiPemeriksaanPenunjangPage } from './informasi-pemeriksaan-penunjang.page';

const routes: Routes = [
  {
    path: '',
    component: InformasiPemeriksaanPenunjangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformasiPemeriksaanPenunjangPageRoutingModule {}
