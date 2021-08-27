import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPasienPageRoutingModule } from './search-pasien-routing.module';

import { SearchPasienPage } from './search-pasien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPasienPageRoutingModule
  ],
  declarations: [SearchPasienPage]
})
export class SearchPasienPageModule {}
