import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchKontakEratPage } from './search-kontak-erat.page';

const routes: Routes = [
  {
    path: '',
    component: SearchKontakEratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchKontakEratPageRoutingModule {}
