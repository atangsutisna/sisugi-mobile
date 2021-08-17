import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KontakEratPage } from './kontak-erat.page';

const routes: Routes = [
  {
    path: '',
    component: KontakEratPage
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KontakEratPageRoutingModule {}
