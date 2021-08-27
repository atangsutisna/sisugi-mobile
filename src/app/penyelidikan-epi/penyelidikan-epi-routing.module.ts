import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenyelidikanEpiPage } from './penyelidikan-epi.page';

const routes: Routes = [
  {
    path: '',
    component: PenyelidikanEpiPage
  },
  {
    path: 'search-pasien',
    loadChildren: () => import('./search-pasien/search-pasien.module').then( m => m.SearchPasienPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenyelidikanEpiPageRoutingModule {}
