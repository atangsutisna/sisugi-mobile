import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsomanPage } from './isoman.page';

const routes: Routes = [
  {
    path: '',
    component: IsomanPage
  },
  {
    path: ':id/create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
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
export class IsomanPageRoutingModule {}
