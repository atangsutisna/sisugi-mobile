import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenyelidikanEpiPageRoutingModule } from './penyelidikan-epi-routing.module';

import { PenyelidikanEpiPage } from './penyelidikan-epi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenyelidikanEpiPageRoutingModule
  ],
  declarations: [PenyelidikanEpiPage]
})
export class PenyelidikanEpiPageModule {}
