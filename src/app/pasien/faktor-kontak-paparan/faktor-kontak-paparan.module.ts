import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaktorKontakPaparanPageRoutingModule } from './faktor-kontak-paparan-routing.module';

import { FaktorKontakPaparanPage } from './faktor-kontak-paparan.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FaktorKontakPaparanPageRoutingModule
  ],
  declarations: [FaktorKontakPaparanPage]
})
export class FaktorKontakPaparanPageModule {}
