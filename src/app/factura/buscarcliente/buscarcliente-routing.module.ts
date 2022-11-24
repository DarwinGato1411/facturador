import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarclientePage } from './buscarcliente.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarclientePageRoutingModule {}
