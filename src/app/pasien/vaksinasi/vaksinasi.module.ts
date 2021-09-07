import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaksinasiPageRoutingModule } from './vaksinasi-routing.module';

import { VaksinasiPage } from './vaksinasi.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    VaksinasiPageRoutingModule
  ],
  declarations: [VaksinasiPage]
})
export class VaksinasiPageModule {}
