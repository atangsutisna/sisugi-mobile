import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasienPage } from './pasien.page';

const routes: Routes = [
  {
    path: '',
    component: PasienPage,
  },
  {
    path: 'create-pasien',
    loadChildren: () =>
      import('./create-pasien/create-pasien.module').then(
        (m) => m.CreatePasienPageModule
      ),
  },
  {
    path: 'edit-pasien/:id',
    loadChildren: () =>
      import('./edit-pasien/edit-pasien.module').then(
        (m) => m.EditPasienPageModule
      ),
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'kontak-erat/:id',
    loadChildren: () => import('./kontak-erat/kontak-erat.module').then( m => m.KontakEratPageModule)
  },
  {
    path: 'isoman/:id',
    loadChildren: () => import('./isoman/isoman.module').then( m => m.IsomanPageModule)
  },
  {
    path: 'catatan/:id',
    loadChildren: () => import('./catatan/catatan.module').then( m => m.CatatanPageModule)
  },
  {
    path: 'informasi-klinis/:id',
    loadChildren: () => import('./informasi-klinis/informasi-klinis.module').then( m => m.InformasiKlinisPageModule)
  },
  {
    path: 'informasi-pemeriksaan-penunjang/:id',
    loadChildren: () => import('./informasi-pemeriksaan-penunjang/informasi-pemeriksaan-penunjang.module').then( m => m.InformasiPemeriksaanPenunjangPageModule)
  },
  {
    path: 'faktor-kontak-paparan/:id',
    loadChildren: () => import('./faktor-kontak-paparan/faktor-kontak-paparan.module').then( m => m.FaktorKontakPaparanPageModule)
  },
  {
    path: 'vaksinasi/:id',
    loadChildren: () => import('./vaksinasi/vaksinasi.module').then( m => m.VaksinasiPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasienPageRoutingModule {}
