import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'pasien',
    loadChildren: () =>
      import('./pasien/pasien.module').then((m) => m.PasienPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'penyelidikan-epi',
    loadChildren: () =>
      import('./penyelidikan-epi/penyelidikan-epi.module').then(
        (m) => m.PenyelidikanEpiPageModule
      ),
      canLoad: [AuthGuard]
  },
  {
    path: 'isoman',
    loadChildren: () =>
      import('./isoman/isoman.module').then((m) => m.IsomanPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'kontak-erat',
    loadChildren: () =>
      import('./kontak-erat/kontak-erat.module').then(
        (m) => m.KontakEratPageModule
      ),
      canLoad: [AuthGuard]
  },
  {
    path: 'pemantauan-kes',
    loadChildren: () =>
      import('./pemantauan-kes/pemantauan-kes.module').then(
        (m) => m.PemantauanKesPageModule
      ),
      canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
