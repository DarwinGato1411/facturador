import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HojavidaPage } from './hojavida.page';

const routes: Routes = [
  {
    path: '',
    component: HojavidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HojavidaPageRoutingModule {}
