import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IsomanPageRoutingModule } from './isoman-routing.module';

import { IsomanPage } from './isoman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IsomanPageRoutingModule
  ],
  declarations: [IsomanPage]
})
export class IsomanPageModule {}
