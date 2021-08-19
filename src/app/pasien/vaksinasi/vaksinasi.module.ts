import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaksinasiPageRoutingModule } from './vaksinasi-routing.module';

import { VaksinasiPage } from './vaksinasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaksinasiPageRoutingModule
  ],
  declarations: [VaksinasiPage]
})
export class VaksinasiPageModule {}
