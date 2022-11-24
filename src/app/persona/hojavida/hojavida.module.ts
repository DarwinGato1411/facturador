import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HojavidaPageRoutingModule } from './hojavida-routing.module';

import { HojavidaPage } from './hojavida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HojavidaPageRoutingModule
  ],
  declarations: [HojavidaPage]
})
export class HojavidaPageModule {}
