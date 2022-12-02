import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabprincipalPage } from './tabprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: TabprincipalPage,
    children: [
          {
            path: 'servicio',
            children: [
              {
                path: '',
                loadChildren: () => import('../../servicioproducto/servicio/servicio.module').then(m => m.ServicioPageModule)
              }
            ]
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          },
          {
            path: 'turismo',
            children: [
              {
                path: '',
                loadChildren: () => import('../../servicioproducto/turismo/turismo.module').then(m => m.TurismoPageModule)
              }
            ]
          },
          {
            path: 'configuracion',
            children: [
              {
                path: '',
                loadChildren: () => import('../../usuario/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
              }
            ]
          },
          {
            path: 'destacado',
            children: [
              {
                path: '',
                loadChildren: () => import('../../servicioproducto/producto/producto.module').then(m => m.ProductoPageModule)
              }
            ]
          },
          {
            path: 'login',
            children: [
              {
                path: '',
                loadChildren: () => import('../../usuario/login/login.module').then(m => m.LoginPageModule)
              }
            ]
          }
    ]
  
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabprincipalPageRoutingModule {}
