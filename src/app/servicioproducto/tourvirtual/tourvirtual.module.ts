import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourvirtualPageRoutingModule } from './tourvirtual-routing.module';

import { TourvirtualPage } from './tourvirtual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourvirtualPageRoutingModule
  ],
  declarations: [TourvirtualPage,]
})
export class TourvirtualPageModule {}
