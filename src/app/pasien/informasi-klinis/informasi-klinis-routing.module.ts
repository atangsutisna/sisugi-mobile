import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformasiKlinisPage } from './informasi-klinis.page';

const routes: Routes = [
  {
    path: '',
    component: InformasiKlinisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformasiKlinisPageRoutingModule {}
