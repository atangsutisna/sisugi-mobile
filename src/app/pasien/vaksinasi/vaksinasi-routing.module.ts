import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaksinasiPage } from './vaksinasi.page';

const routes: Routes = [
  {
    path: '',
    component: VaksinasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaksinasiPageRoutingModule {}
