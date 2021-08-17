import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPasienPageRoutingModule } from './edit-pasien-routing.module';

import { EditPasienPage } from './edit-pasien.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditPasienPageRoutingModule
  ],
  declarations: [EditPasienPage]
})
export class EditPasienPageModule {}
