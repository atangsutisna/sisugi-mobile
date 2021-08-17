import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KontakEratPageRoutingModule } from './kontak-erat-routing.module';

import { KontakEratPage } from './kontak-erat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KontakEratPageRoutingModule
  ],
  declarations: [KontakEratPage]
})
export class KontakEratPageModule {}
