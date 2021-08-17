import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PemantauanKesPageRoutingModule } from './pemantauan-kes-routing.module';

import { PemantauanKesPage } from './pemantauan-kes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemantauanKesPageRoutingModule
  ],
  declarations: [PemantauanKesPage]
})
export class PemantauanKesPageModule {}
