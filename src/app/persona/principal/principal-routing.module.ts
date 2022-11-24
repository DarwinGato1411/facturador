import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';
const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,
    children: [

          {
            path: 'listafactura',
            children: [
              {
                path: '',
                loadChildren: () => import('../../factura/listafactura/listafactura.module').then(m => m.ListafacturaPageModule)
              }
            ]
          },
          {
            path: 'facturar',
            children: [
              {
                path: '',
                loadChildren: () => import('../../factura/facturar/facturar.module').then(m => m.FacturarPageModule)
              }
            ]
          },
          {
            path: 'misclientes',
            children: [
              {
                path: '',
                loadChildren: () => import('../../persona/cliente/cliente.module').then(m => m.ClientePageModule)
              }
            ]
          },
          {
            path: '',
            redirectTo: 'facturar',
            pathMatch: 'full'
          },
          {
            path: 'misservicio',
            children: [
              {
                path: '',
                loadChildren: () => import('../../persona/misservicios/misservicios.module').then(m => m.MisserviciosPageModule)
              }
            ]
          }
          ,
          {
            path: 'miperfilpersona',
            children: [
              {
                path: '',
                loadChildren: () => import('../../persona/perfil/perfil.module').then(m => m.PerfilPageModule)
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
export class PrincipalPageRoutingModule {}
