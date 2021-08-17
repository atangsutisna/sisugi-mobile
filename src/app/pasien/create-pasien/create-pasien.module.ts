import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePasienPageRoutingModule } from './create-pasien-routing.module';

import { CreatePasienPage } from './create-pasien.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePasienPageRoutingModule,
  ],
  declarations: [CreatePasienPage],
})
export class CreatePasienPageModule {}
