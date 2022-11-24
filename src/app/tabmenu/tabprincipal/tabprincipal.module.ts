import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabprincipalPageRoutingModule } from './tabprincipal-routing.module';

import { TabprincipalPage } from './tabprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabprincipalPageRoutingModule
  ],
  declarations: [TabprincipalPage]
})
export class TabprincipalPageModule {}
