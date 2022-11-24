import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListafacturaPageRoutingModule } from './listafactura-routing.module';

import { ListafacturaPage } from './listafactura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListafacturaPageRoutingModule
  ],
  declarations: [ListafacturaPage]
})
export class ListafacturaPageModule {}
