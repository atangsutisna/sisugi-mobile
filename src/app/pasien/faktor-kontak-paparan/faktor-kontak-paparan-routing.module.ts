import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaktorKontakPaparanPage } from './faktor-kontak-paparan.page';

const routes: Routes = [
  {
    path: '',
    component: FaktorKontakPaparanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaktorKontakPaparanPageRoutingModule {}
