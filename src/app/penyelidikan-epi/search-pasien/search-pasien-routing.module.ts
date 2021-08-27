import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPasienPage } from './search-pasien.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPasienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPasienPageRoutingModule {}
