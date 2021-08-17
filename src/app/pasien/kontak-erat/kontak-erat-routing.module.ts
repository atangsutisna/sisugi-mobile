import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KontakEratPage } from './kontak-erat.page';

const routes: Routes = [
  {
    path: '',
    component: KontakEratPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KontakEratPageRoutingModule {}
