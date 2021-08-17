import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePasienPage } from './create-pasien.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePasienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePasienPageRoutingModule {}
