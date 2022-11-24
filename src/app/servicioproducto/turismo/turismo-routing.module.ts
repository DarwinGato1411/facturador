import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurismoPage } from './turismo.page';

const routes: Routes = [
  {
    path: '',
    component: TurismoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurismoPageRoutingModule {}
