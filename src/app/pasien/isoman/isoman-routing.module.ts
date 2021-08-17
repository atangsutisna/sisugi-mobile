import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsomanPage } from './isoman.page';

const routes: Routes = [
  {
    path: '',
    component: IsomanPage
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
export class IsomanPageRoutingModule {}
