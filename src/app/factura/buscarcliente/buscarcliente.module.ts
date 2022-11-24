import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarclientePageRoutingModule } from './buscarcliente-routing.module';

import { BuscarclientePage } from './buscarcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarclientePageRoutingModule
  ],
  declarations: [BuscarclientePage]
})
export class BuscarclientePageModule {}
