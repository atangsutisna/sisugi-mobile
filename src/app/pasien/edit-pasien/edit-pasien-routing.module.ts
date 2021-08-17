import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPasienPage } from './edit-pasien.page';

const routes: Routes = [
  {
    path: '',
    component: EditPasienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPasienPageRoutingModule {}
