import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SearchKontakEratPageRoutingModule } from './search-kontak-erat-routing.module';

import { SearchKontakEratPage } from './search-kontak-erat.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SearchKontakEratPageRoutingModule
  ],
  declarations: [SearchKontakEratPage]
})
export class SearchKontakEratPageModule {}
