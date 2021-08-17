import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemantauanKesPage } from './pemantauan-kes.page';

const routes: Routes = [
  {
    path: '',
    component: PemantauanKesPage
  },
  {
    path: 'create/:kontakId',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'search-kontak-erat',
    loadChildren: () => import('./search-kontak-erat/search-kontak-erat.module').then( m => m.SearchKontakEratPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemantauanKesPageRoutingModule {}
