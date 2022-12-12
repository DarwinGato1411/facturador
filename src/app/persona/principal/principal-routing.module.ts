import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';
const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,
    children: [

      {
        path: 'iniciofactura',
        children: [
          {
            path: '',
            loadChildren: () => import('../../factura/buscarcliente/buscarcliente.module').then(m => m.BuscarclientePageModule)
          }
        ]
      }, {
        path: 'listafactura',
        children: [
          {
            path: '',
            loadChildren: () => import('../../factura/listafactura/listafactura.module').then(m => m.ListafacturaPageModule)
          }
        ]
      },
      {
        path: 'misservicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../../persona/misservicios/misservicios.module').then(m => m.MisserviciosPageModule)
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
        path: 'miperfilpersona',
        children: [
          {
            path: '',
            loadChildren: () => import('../../persona/perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },

      

      {
        path: '',
        redirectTo: 'iniciofactura',
        pathMatch: 'full'
      }


    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule { }
