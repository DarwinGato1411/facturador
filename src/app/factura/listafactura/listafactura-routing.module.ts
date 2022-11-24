import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListafacturaPage } from './listafactura.page';

const routes: Routes = [
  {
    path: '',
    component: ListafacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListafacturaPageRoutingModule {}
