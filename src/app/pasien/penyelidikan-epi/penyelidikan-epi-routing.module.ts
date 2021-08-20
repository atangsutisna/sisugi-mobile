import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenyelidikanEpiPage } from './penyelidikan-epi.page';

const routes: Routes = [
  {
    path: '',
    component: PenyelidikanEpiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenyelidikanEpiPageRoutingModule {}
